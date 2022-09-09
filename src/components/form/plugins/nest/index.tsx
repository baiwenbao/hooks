import { FormStore } from '../../ts/createFormStore';
import plugins, { CustomFieldProps } from '../../ts/hooks';
import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import { IField, Value } from '../../type/field';
import { useForm } from '../../index';
import { IForm } from '../../type/form';
import { Row } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Subject } from 'rxjs';
import { debounceTime, filter, pluck, takeUntil } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import update from 'immutability-helper';
import { uniqueId, omit } from 'lodash';
import useUnmount from '../../../../lib/useUnmount';

declare type NestItemProps = {
  formConfig: IForm;
  parentFormStore: FormStore;
  parentName: string;
  formStoresRef: React.MutableRefObject<FormStore[]>;
  multiple: boolean | undefined;
  initialValues: { [x: string]: Value };
  displayAs: IField['displayAs'];
};

const NestItem = (props: NestItemProps) => {
  const {
    formConfig,
    parentFormStore,
    parentName,
    formStoresRef,
    multiple,
    initialValues,
    displayAs,
  } = props;
  const { form, formStore } = useForm({
    formConfig,
  });

  useEffect(() => {
    // @ts-ignore
    formStoresRef.current.push(formStore);
    const { plugins, field$s } = formStore;

    plugins.initFormStore.tap('init form', (formStore) => {
      const allValues = formStoresRef.current.map((formStore) => {
        return formStore.getValues();
      });

      parentFormStore.dispatch(
        parentName,
        {
          value: multiple ? allValues : allValues[0],
        },
        'fieldChange',
      );
    });

    // 数据上行
    plugins.dispatch.tap('set parent value', (state, formStore, updateState) => {
      const { name, valuePropName = 'value' } = state;
      const prevValue = field$s[name!].getValue().value;
      if (
        state.__from__ === 'parent' ||
        !Reflect.has(updateState, valuePropName) ||
        prevValue === state.value
      )
        return state;

      Promise.resolve().then(() => {
        const allValues = formStoresRef.current.map((formStore) => {
          return formStore.getValues();
        });

        parentFormStore.dispatch(
          parentName,
          {
            value: multiple ? allValues : allValues[0],
          },
          state.__from__,
        );
      });
      return state;
    });

    return () => {
      const index = formStoresRef.current.findIndex((_formStore) => _formStore === formStore);
      formStoresRef.current.splice(index, 1);
      formStore.remove();
    };
  }, []);

  useEffect(() => {
    // 设置初始值
    const values = omit(initialValues, 'uid');
    if (Object.keys(values).length) {
      formStore.setValues(values, 'parent');
    } else {
      formStore.resetFields(undefined, 'parent');
    }
  }, [initialValues]);

  useEffect(() => {
    displayAs && formStore.setStatus(displayAs);
  }, [displayAs]);

  return form;
};

const Nest = (props: CustomFieldProps) => {
  const { fieldState, formStore } = props;
  const {
    formItems,
    name,
    multiple,
    layout = 'horizontal',
    labelCol,
    labelAlign,
    wrapperCol,
    displayAs,
    flatten,
    span,
  } = fieldState;
  const field = formItems?.[0].field;

  // console.assert(flatten ? multiple && formItems?.length === 1 && (Array.isArray(field) && field.length === 1) : true, 'flatten 配置不正确');

  const dataSource$ = useMemo(() => new Subject<(Value & { uid: string }[]) | null>(), []);
  const dataSource = useObservable(() => dataSource$);

  const formStoresRef = useRef<FormStore[]>([]);
  const ummount$ = useUnmount();

  const formConfig: IForm = useMemo(
    () => ({
      layout,
      labelCol,
      wrapperCol,
      labelAlign,
      formItems,
      span,
    }),
    [formItems],
  );

  useEffect(() => {
    const { $ } = formStore;

    // 记录子表单formStore
    formStore.childFormStoresRefs = formStore.childFormStoresRefs ?? [];
    formStore.childFormStoresRefs.push(formStoresRef);

    // 数据下行
    $(name!)
      .pipe(
        takeUntil(ummount$),
        debounceTime(50),
        filter((state) => state.__from__ !== 'fieldChange'),
        pluck('value'),
      )
      .subscribe((value) => {
        if (flatten && multiple) {
          const name = Array.isArray(field) ? field[0].name : field?.name;

          value = value
            ? (value as Array<string | number>).map((item) => {
                return typeof item === 'object'
                  ? item
                  : {
                      [name!]: item,
                    };
              })
            : [{}];
        }
        const parentValue = Array.isArray(value) ? (value.length ? value : [{}]) : [value ?? {}];

        const parentValueWithUid = parentValue.map((value) => {
          return Reflect.has(value, 'uid')
            ? value
            : Object.assign({}, value, {
                uid: uniqueId(),
              });
        });

        dataSource$.next(parentValueWithUid);
      });
  }, []);

  const isPreview = displayAs === 'preview';

  const node = dataSource?.map((item, index) => {
    const { dispatch } = formStore;
    const minus = (
      <MinusCircleOutlined
        style={{ marginLeft: 8 }}
        onClick={() => {
          dataSource$.next(dataSource.filter(({ uid }) => item.uid !== uid));

          // 数据上行
          Promise.resolve().then(() => {
            const allValues = formStoresRef.current.map((formStore) => formStore.getValues());
            dispatch(
              name,
              {
                value: allValues,
              },
              'fieldChange',
            );
          });
        }}
      />
    );

    const plus = (
      <PlusCircleOutlined
        style={{ marginLeft: 8 }}
        onClick={() => {
          const newValue = update(dataSource, {
            $splice: [[index + 1, 0, { uid: uniqueId() }]],
          });
          dataSource$.next(newValue);
        }}
      />
    );

    const icon =
      multiple && !isPreview ? (
        <span style={{ lineHeight: '32px' }}>
          {dataSource.length > 1 && minus}
          {plus}
        </span>
      ) : null;

    const comboItem = (
      <>
        <NestItem
          formConfig={formConfig}
          parentFormStore={formStore}
          parentName={name!}
          formStoresRef={formStoresRef}
          multiple={multiple}
          initialValues={item}
          displayAs={displayAs}
        />
        {icon}
      </>
    );

    return multiple ? (
      <Row key={item.uid}>{comboItem}</Row>
    ) : (
      <Fragment key={index}>{comboItem}</Fragment>
    );
  });

  return <>{node}</>;
};

// @ts-ignore
plugins.field.tap('nest', (customFieldProps) => {
  // @ts-ignore
  return <Nest {...customFieldProps} />;
});

const travelFormStore = (formStore: FormStore, ret: { isValid: boolean }, level = 0) => {
  const { childFormStoresRefs } = formStore;
  level++;

  childFormStoresRefs?.forEach((formStoresRef) => {
    const { current: formStores } = formStoresRef;
    formStores?.forEach((formStore) => {
      travelFormStore(formStore, ret, level);
    });
  });

  // 第一层不需要在这里校验
  if (level !== 0) {
    formStore.validate();
    const err = formStore.getErrors();
    if (err) {
      ret.isValid = false;
    }
  }

  return ret;
};

/**执行child form校验 如果有异常则终止提交 */
plugins.beforeSubmit.tap('nest validate', (values, formStore) => {
  const { isValid } = travelFormStore(formStore, { isValid: true });
  return isValid ? values : false;
});

/**flatten */
plugins.getValue.tap('flatten nest field value', (value, field) => {
  const { type, multiple, flatten } = field;
  if (type !== 'nest' || !multiple || !flatten) return value;
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'object') return Object.values(item)[0];
      return item;
    });
  }
  return value;
});
