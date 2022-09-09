import React, { useContext } from 'react';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { IField, IField$s, IField$, Values, Option } from '../type/field';
import { validateFields } from './validate';
import format from './format';
import moment from 'moment';
import { AxiosInstance } from 'axios';
import { default as immSetValues } from '../../../lib/setValues';
import getRules from '../../../lib/rules';
import { internalPluginsFactory } from './hooks';
import { IForm } from '../type/form';
import update from 'immutability-helper';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { omit, get, pick as lodashPick } from 'lodash';

export const isDateField = (type?: IField['type']) => {
  return type ? ['date', 'datetime', 'daterange', 'time'].includes(type) : false;
};

export const isOptionField = (type: IField['type']) => {
  return ['select', 'radio', 'checkbox', 'autocomplete'].includes(type);
};

export const getFieldValue = (type: IField['type'] | undefined, value: IField['value']) => {
  const schema =
    type === 'date'
      ? 'YYYY-MM-DD'
      : type === 'datetime'
      ? 'YYYY-MM-DD HH:mm:ss'
      : type === 'time'
      ? 'HH:mm:ss'
      : 'YYYY-MM-DD';
  return isDateField(type) && value && typeof value === 'string' ? moment(value, schema) : value;
};

const saveOptions = (field: IField, state?: Partial<IField>) => {
  if (!(state && 'options' in field)) return field;

  const updateKeys = Object.keys(state);
  const { type, __options__, value } = field;

  if (
    typeof value === 'undefined' ||
    !isOptionField(type) ||
    !['value', '__options__'].some((key) => updateKeys.includes(key))
  )
    return field;
  // 存储option
  let option: Option | Option[] | undefined;
  // 多选
  if (Array.isArray(value)) {
    option = __options__?.filter((option) => (value as unknown[]).includes(option.value));
  } else {
    option = __options__?.find((option) => option.value === value);
  }
  return immSetValues(field, {
    option,
  });
};

type CreateFormProps = {
  name?: string | Symbol;
};

type FieldSelectOptions = {
  include?: string | string[];
  exclude?: string | string[];
};

const createFormStore = (props?: CreateFormProps) => {
  const name = props?.name;
  // 存储所有field状态
  const field$s: IField$s = {};
  const unmount$ = new Subject();

  /** 触发提交 */
  const submitEvent$ = new Subject();

  /**
   * @description 收集field$
   * @param name
   * @param initial
   */
  const register = (name: string, _initial: IField) => {
    if (field$s[name]) return;
    /**
     * register plugins
     */
    const initial: IField = plugins.register.call(_initial, formStore);

    let initialState = initial;

    if (Reflect.has(initial, 'initialValue')) {
      initialState = immSetValues(initial, {
        value: initial?.initialValue,
      });
    }

    // 初始化required rule
    const rules = getRules(
      typeof initial?.required === 'boolean' ? initial.required : false,
      initial?.validate,
      initial?.validateMsg,
      initial?.rules,
      initial?.requiredMsg,
    );
    initialState = immSetValues(initialState, {
      rules,
    });

    const field$ = new BehaviorSubject<IField>(initialState);

    Object.assign(field$s, {
      [name]: field$,
    });
  };

  /**
   * @description 更新field$
   * @param name
   * @param updateState
   * @example dispatch(someName, {
   *  'options.params.a': {b: 1}
   * })
   */
  const dispatch = (name: string | undefined, updateState: Partial<IField>, from?: string) => {
    // 这行代码位置不能动
    name && plugins.beforeDispatch.call(name, updateState, formStore);
    if (!name || !field$s[name]) {
      console.warn(`${field$s}不存在${name}控件`);
      return;
    }

    // 兼容回显日期数据
    if ('value' in updateState) {
      const { type } = field$s[name].getValue();

      updateState = immSetValues(updateState, {
        value: getFieldValue(type, updateState.value),
      });
    }

    const field$ = field$s[name];
    const prev = field$.getValue();
    const updateKeys = Object.keys(updateState);

    // 只检查修改的属性
    // 浅比较
    if (updateKeys.every((key) => get(prev, key) === updateState[key])) return;

    let next = immSetValues<IField>(prev, updateState);

    // 存储__options__
    next = saveOptions(next, updateState);

    if (Reflect.has(updateState, 'required')) {
      const { required } = next;
      let rules = next.rules ?? [];
      const requiredRuleIndex = rules?.findIndex((rule) => Reflect.has(rule, 'required'));
      if (requiredRuleIndex !== -1) {
        rules = immSetValues(rules, {
          [requiredRuleIndex]: {
            required,
          },
        });
      } else {
        rules = update(rules, {
          $push: [
            {
              required: <boolean>required,
              message: '不能为空',
            },
          ],
        });
      }
      next = immSetValues(next, {
        rules,
      });
    }

    // 标记dispatch来源
    if (from) {
      next = immSetValues(next, {
        __from__: from,
      });
    } else {
      Reflect.deleteProperty(next, '__from__');
    }

    next = plugins.dispatch.call(next, formStore, updateState) as IField;

    field$.next(next);

    /** value或校验 变化触发校验， 可能存在异步校验 所以校验结果(error)需要单独dispatch */
    // 防止循环校验
    const isFromValidate = updateKeys.includes('error');
    // const shouldValidate = ['value', 'required', 'rules', 'validate', 'validateMsg'].some(key => updateKeys.includes(key));
    const shouldValidate = updateKeys.includes('value');
    if (shouldValidate && !isFromValidate) {
      validate(name, from);
    }
  };

  const remove = (names?: string | string[]) => {
    const keys = Object.keys(field$s);
    if (typeof names === 'undefined') {
      names = keys;
    } else if (!Array.isArray(names)) {
      names = [names];
    }

    // 卸载标记
    unmount$.next(undefined);

    names.forEach((name) => {
      console.assert(keys.includes(name), `form不存在${name}控件`);
      // removeField$.next(name);
      const field$ = field$s[name];
      field$.complete();
      field$.unsubscribe();
      Reflect.deleteProperty(field$s, name);
    });
  };

  /**从field$s中选取field$ */
  const pick = (names: string | string[]): IField$[] => {
    if (Array.isArray(names)) {
      const pickField$s = names.map((name) => field$s[name]);
      if (pickField$s.some((field$) => !Boolean(field$))) {
        console.warn(`${Object.keys(field$s)}不存在${names}字段`);
      }
      return pickField$s.filter(Boolean);
    }
    if (!field$s[names]) {
      console.warn(`${Object.keys(field$s)}不存在${names}字段`);
      return [];
    }
    return [field$s[names]];
  };
  // $('a').subs
  function $(names: string): BehaviorSubject<IField>;
  function $(names: string, options?: FieldSelectOptions): Observable<IField>;
  function $(names: string[], options?: FieldSelectOptions): Observable<IField[]>;
  function $(names: string | string[], options?: FieldSelectOptions) {
    if (typeof names === 'string') {
      if (!options) return field$s[names];
      return field$s[names].pipe(
        map((field) => {
          const { include, exclude } = options;
          if (include) {
            return lodashPick(field, include);
          } else if (exclude) {
            return omit(field, exclude);
          }
          return field;
        }),
        distinctUntilChanged((prev, next) => {
          const prevKeys = Object.keys(prev);
          const nextKeys = Object.keys(next);
          return (
            prevKeys.length === nextKeys.length && prevKeys.every((key) => prev[key] === next[key])
          );
        }),
      );
    }
    console.assert(Array.isArray(names));
    return combineLatest(names.map((name) => $(name, options))).pipe(takeUntil(unmount$));
  }

  const validate = (names?: string | string[], from?: string) => {
    const allNames = Object.keys(field$s);
    names = Array.isArray(names) ? names : typeof names === 'undefined' ? allNames : [names];
    const activeNames = getActiveNames(names);
    return validateFields(activeNames, { field$s, dispatch }, from);
  };

  /**过滤visible, submit为false的控件 */
  const getActiveNames = (names: string[]) => {
    return names.filter((name) => {
      const field$ = field$s[name];
      if (!field$) return false;
      const { __visible__, visible, submit } = field$.getValue();
      if (submit === true) return true;
      if (__visible__ === false || visible === false) return false;
      return true;
    });
  };

  const getErrors = (names?: string | string[]): { [name: string]: string } | null => {
    const allNames = Object.keys(field$s);
    names = Array.isArray(names) ? names : typeof names === 'undefined' ? allNames : [names];

    const activeNames = getActiveNames(names);

    const errors = activeNames.reduce((acc, name) => {
      const state = field$s[name].getValue();
      if (state.error) {
        Object.assign(acc, {
          [name]: state.error,
        });
      }
      return acc;
    }, {});
    return Object.values(errors).filter(Boolean).length ? errors : null;
  };

  /**获取控件value */
  const getValues = (names?: string | string[]): { [name: string]: any } => {
    const allNames = Object.keys(field$s);
    names = Array.isArray(names) ? names : typeof names === 'undefined' ? allNames : [names];

    const activeNames = getActiveNames(names);

    const values = activeNames.reduce((acc, name) => {
      const fieldState = field$s[name].getValue();
      const pluginValue = plugins.getValue.call(fieldState.value, fieldState, formStore);

      Object.assign(acc, {
        [name]: format({ ...fieldState, value: pluginValue }),
      });
      return acc;
    }, {});

    return values;
    // 提交前执行自定义逻辑，如返回false将阻止提交
    // return plugins.beforeSubmit.call(values, formStore);
  };

  // 提交状态
  let isSubmiting = false;

  const submit = async (
    callback: (
      errors: ReturnType<typeof getErrors>,
      values: ReturnType<typeof getValues>,
    ) => void | Promise<unknown>,
  ) => {
    if (isSubmiting) return;

    let values: Values | boolean = getValues();

    values = plugins.beforeSubmit.call(values, formStore);
    if (!values) return;

    // 执行校验
    await validate().catch((err) => {});

    const errors = getErrors();

    console.assert(typeof values === 'object', 'values必须是object类型');
    if (typeof values !== 'object') {
      return;
    }

    isSubmiting = true;

    const result = callback(errors, values);
    if (typeof result === 'undefined') {
      isSubmiting = false;
    } else if (result instanceof Promise) {
      result
        .then(() => {
          isSubmiting = false;
        })
        .catch(() => {
          isSubmiting = false;
        });
    }
  };

  // setValues({
  //     a: 1,
  //     b: 2
  // })
  /**设置values */
  const setValues = (values: Values, from?: string) => {
    const keys = Object.keys(values);
    keys.forEach((key) => {
      dispatch(
        key,
        {
          value: values[key],
        },
        from,
      );
    });
  };

  // 重置formStore状态
  const resetFields = (_keys?: string[], from?: string) => {
    const keys = _keys ?? Object.keys(field$s);
    keys.forEach((key) => {
      const { initialValue } = field$s[key].getValue();
      dispatch(
        key,
        {
          value: initialValue,
          error: undefined,
        },
        from,
      );
    });
  };

  // 设置表单状态
  const setStatus = (status: IField['displayAs'] = 'preview') => {
    const keys = Object.keys(field$s);
    keys.forEach((key) => {
      const { __visible__ } = field$s[key].value;
      if (__visible__ === false) return;
      dispatch(key, {
        displayAs: status,
        error: undefined,
      });
    });
  };

  /**internal plugins */
  const plugins = internalPluginsFactory();

  const formStore = {
    name,
    field$s,
    dispatch,
    register,
    remove,
    pick,
    $,
    validate,
    getValues,
    getErrors,
    submit,
    setValues,
    resetFields,
    setStatus,
    plugins,
    submitEvent$,
  };

  return formStore;
};

export interface FormStore extends ReturnType<typeof createFormStore> {
  childFormStoresRefs?: React.MutableRefObject<FormStore[]>[];
}

// export declare type FormStore = {
// 	// form name
// 	name?: string;
// 	// 控件数据
// 	field$s: IField$s;
// 	// 注册控件
// 	register: (name: string, _initial: IField) => void;
// 	// 修改数据
// 	dispatch: (
// 		name: string | undefined,
// 		updateState: Partial<IField> & { [x: string]: any },
// 		from?: string
// 	) => void;
// 	// 移除控件
// 	remove: (names?: string | string[]) => void;
// 	pick: (names: string | string[]) => IField$[];
// 	// 选择一个或多个控件
// 	$: <T extends string | string[]>(
// 		name: T,
// 		options?: FieldSelectOptions
// 	) => T extends Array<string> ? Observable<IField[]> : BehaviorSubject<IField>;
// 	// 校验
// 	validate: (names?: string | string[], from?: string) => void;
// 	// 获取错误信息
// 	getErrors: (names?: string | string[]) => { [name: string]: string } | null;
// 	// 获取值
// 	getValues: (names?: string | string[]) => { [name: string]: any };
// 	// 提交
// 	submit: (
// 		submition: (
// 			errors: { [name: string]: string } | null,
// 			values: { [name: string]: any }
// 		) => void | Promise<unknown>
// 	) => void;
// 	// 批量设置控件值
// 	setValues: (values: Values, from?: string) => void;
// 	// 清除控件值和状态
// 	resetFields: (_keys?: string[], from?: string) => void;
// 	// 设置表单状态'disabled' | 'preview' | 'edit'
// 	setStatus: (status: IField['displayAs']) => void;
// 	// 表单局部plugins
// 	plugins: ReturnType<typeof internalPluginsFactory>;
// 	childFormStoresRefs?: React.MutableRefObject<FormStore[]>[];
// };

export const FormContext = React.createContext(
  {} as {
    formStore: FormStore;
    request?: AxiosInstance;
  },
);

export const SchemaContext = React.createContext(
  {} as {
    schema: IForm;
  },
);

export default createFormStore;
