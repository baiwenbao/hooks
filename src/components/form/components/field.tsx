import React, {
  cloneElement,
  ChangeEvent,
  useEffect,
  useContext,
  memo,
  useMemo,
  useRef,
} from 'react';
import { IField, OptionableTypes, Value } from '../type/field';
import { FormContext, SchemaContext } from '../ts/createFormStore';
import {
  Input,
  Select,
  Checkbox,
  DatePicker,
  Radio,
  AutoComplete,
  TimePicker,
  Tooltip,
  TreeSelect,
} from 'antd';
import useOption from '../ts/useOptions';
import { useObservable } from 'rxjs-hooks';
import useWhere from '../ts/useWhere';
import globalPlugins from '../ts/hooks';
import TextArea from 'antd/lib/input/TextArea';
import { useParseExpr } from '../../../lib/useParseExpr';
import format from '../ts/format';
import useListener from '../ts/useListener';
import { debounceTime, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, iif, Subject } from 'rxjs';
import useUnmount from '../../../lib/useUnmount';
import { setting } from '../ts/option';

const Link = setting.Link;

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldValueToText = (field: IField) => {
  const { option, value } = field;
  if (option && Array.isArray(option)) {
    return option.map(({ label }) => label).join(',');
  } else if (option) {
    return option.label;
  } else if (Array.isArray(value)) {
    return value
      .map((item) =>
        format({
          ...field,
          value: item,
        }),
      )
      .join(',');
  }

  return format(field);
};

const internalFieldNames = [
  'input',
  'inputnumber',
  'inputlist',
  'autocompletelist',
  'select',
  'checkbox',
  'check',
  'radio',
  'text',
  'date',
  'datetime',
  'time',
  'daterange',
  'phone',
  'autocomplete',
  'textarea',
  'treeselect',
];

const Field = memo(({ field }: { field: IField }) => {
  const { formStore } = useContext(FormContext);
  const { dispatch, field$s, plugins, submitEvent$ } = formStore;
  const { name } = field;
  const internalValue$ = useMemo(() => new BehaviorSubject<Value>(undefined), []);
  const change$ = useMemo(() => new Subject<undefined>(), []);
  const blur$ = useMemo(() => new Subject<undefined>(), []);
  const focus$ = useMemo(() => new Subject<ChangeEvent<HTMLInputElement>>(), []);
  // name && register(name, field);
  useParseExpr(field);

  const prevState = useRef<IField>();

  const fieldState = name
    ? useObservable(
        () =>
          field$s[name].pipe(
            // 过滤由控件触发的value改动
            filter((state) => {
              const { __from__, error } = state;
              if (__from__ === 'fieldChange' && error === prevState.current?.error) return false;
              return true;
            }),
            tap((state) => {
              const { value } = state;

              /**外部数据同步到内部 */
              if (value !== internalValue$.getValue()) {
                internalValue$.next(value);
              }

              prevState.current = state;
            }),
          ),
        field,
      )
    : field;

  const {
    type = 'input',
    props = {},
    value,
    valuePropName = 'value',
    width,
    placeholder,
    displayAs,
    error,
    tip,
    trigger = 'change',
    link,
    visible: fieldVisible,
    submitOnEnter,
  } = fieldState;
  const options = useOption(formStore, fieldState as IField<OptionableTypes>);
  const visible = useWhere(fieldState, 'visible');
  const disabled = useWhere(fieldState, 'disabled');
  useListener(fieldState);

  const internalValue = useObservable(() => internalValue$, value);

  const unmount$ = useUnmount();

  useEffect(() => {
    plugins.fieldMounted.call(field, formStore);

    /**value 上报 */
    const trigger$ = iif(() => trigger === 'change', change$, blur$);

    trigger$
      .pipe(
        takeUntil(unmount$),
        debounceTime(setting.reportTime),
        withLatestFrom(internalValue$, field$s[name!]),
        filter(([, value, state]) => {
          if (Object.is(value, state.value)) return false;
          return true;
        }),
        tap(([, value]) => {
          dispatch(
            name,
            {
              value,
            },
            'fieldChange',
          );
        }),
      )
      .subscribe();
  }, []);

  let antdField!: JSX.Element;

  const fieldValue = Number.isNaN(internalValue) ? undefined : internalValue;

  switch (type) {
    case 'input':
      antdField = <Input />;
      break;
    case 'password':
      antdField = <Input.Password />;
      break;
    case 'inputnumber':
      antdField = <Input type="number" />;
      break;
    case 'textarea':
      antdField = <TextArea />;
      break;
    case 'select':
      antdField = (
        <Select allowClear={true}>
          {options?.map((option) => {
            const { label, value } = option;
            return (
              <Option value={value} key={value}>
                {label}
              </Option>
            );
          })}
        </Select>
      );
      break;
    case 'checkbox':
      antdField = <Checkbox.Group options={options ?? undefined} />;
      break;
    case 'radio':
      antdField = <Radio.Group options={options ?? undefined} />;
      break;
    case 'date':
      antdField = <DatePicker />;
      break;
    case 'datetime':
      antdField = <DatePicker showTime />;
      break;
    case 'time':
      antdField = <TimePicker />;
      break;
    case 'daterange':
      antdField = <RangePicker />;
      break;
    case 'treeselect':
      antdField = <TreeSelect />;
      break;
    case 'autocomplete':
      const dataSource = options?.map(({ label, value, ...others }) => ({
        ...others,
        text: label as string,
        value: String(value),
      }));
      antdField = <AutoComplete options={dataSource} />;
      break;
    case 'text':
      antdField = <>{fieldValue}</>;
      break;
    default:
      if (typeof type !== 'undefined') {
        const globalCustomTap = globalPlugins.field.taps.find(({ name }) => name === type);
        const customTap = plugins.field.taps.find(({ name }) => name === type);
        console.assert(!!customTap || !!globalCustomTap, `缺失自定义控件${type}`);

        const customFieldProps = {
          fieldState,
          formStore,
          internalValue,
          internalValue$,
          change$,
          blur$,
        };

        const cusField = (customTap?.fn(customFieldProps) ??
          globalCustomTap?.fn(customFieldProps)) as unknown as JSX.Element;

        antdField = cloneElement(cusField, {
          fieldState,
          formStore,
          internalValue$,
          internalValue,
          blur$,
          change$,
        });
      } else {
        antdField = <>{fieldValue}</>;
      }
  }

  // visible
  if (visible === false || fieldVisible === false) {
    return null;
  }

  // width
  if (typeof width !== 'undefined' && fieldState) {
    (props as any).style = {
      ...(props as any).style,
      width,
    };
  }

  const _value =
    typeof fieldValue === 'string' && fieldValue.includes('@{') ? undefined : fieldValue;

  const clonedProps = {
    ...(props as any),
    disabled,
    [valuePropName ?? 'value']: _value,
    width,
    // value: _value,
    placeholder,
    onChange(e: ChangeEvent<HTMLInputElement> | string | boolean | number | undefined) {
      let value!: Readonly<unknown>;
      if (e && typeof e === 'object' && 'target' in e) {
        value = e.target[valuePropName as 'checked' | 'value'];
      } else {
        value = e as Readonly<unknown>;
      }

      internalValue$.next(value);
      change$.next();
      // props?.onChange(value);
    },
    onBlur() {
      blur$.next();
      plugins.blur.call(fieldState, formStore);
    },
    onPressEnter() {
      if (submitOnEnter) {
        submitEvent$.next();
      }
    },
  };

  if (displayAs === 'preview' && internalFieldNames.includes(type)) {
    const result = fieldValueToText(fieldState) as string;
    antdField = link ? (
      link.type === 'a' ? (
        <a target={link.target} href={link.url}>
          {result}
        </a>
      ) : (
        <Link target={link.target} to={link.url}>
          {result}
        </Link>
      )
    ) : (
      <>
        <span style={{ width, display: 'inline-block' }}>{result}</span>
      </>
    );
  }

  const tipProps =
    tip && typeof tip === 'object' && 'title' in tip
      ? tip
      : {
          title: tip,
        };

  const node = cloneElement(antdField, clonedProps);

  // dynamiclist控件不添加 has-error className
  return (
    <span className={error && typeof error.index === 'undefined' ? 'has-error' : ''}>
      {tip ? <Tooltip {...tipProps}>{node}</Tooltip> : node}
    </span>
  );
});

export default Field;
