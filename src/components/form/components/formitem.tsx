import { IFormItem } from '../type/formitem';
import useWhere from '../ts/useWhere';
import { Form, Col, Tooltip } from 'antd';
import Field from './field';
import React, {
  cloneElement,
  isValidElement,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { FormContext, FormStore, SchemaContext } from '../ts/createFormStore';
import { useObservable } from 'rxjs-hooks';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { IForm } from '../type/form';
import { IField } from '../type/field';
import { ColProps } from 'antd/lib/col';
import { setting } from '../ts/option';
import { parseExpr } from '../../../lib/useParseExpr';
import useUnmount from '../../../lib/useUnmount';
import { isElement } from 'react-dom/test-utils';

const FormCol = (props: ColProps & { layout: IForm['layout']; width?: number }) => {
  const { layout, span, width, ...restProps } = props;
  const widthProps =
    typeof width !== 'undefined'
      ? {
          style: {
            width,
          },
        }
      : { span };
  return layout === 'inline' ? <>{props.children}</> : <Col {...widthProps} {...restProps}></Col>;
};

const FormItem = (props: { formItem: IFormItem }) => {
  const { formStore } = useContext(FormContext);
  const { schema } = useContext(SchemaContext);

  const { $, dispatch, register, plugins, field$s } = formStore;
  const {
    span: globalSpan,
    layout,
    labelCol: globalLabelCol = 4,
    wrapperCol: globalWrapperCol = 20,
    width: globalWidth,
  } = schema;
  const { formItem } = props;
  const {
    field,
    span = globalSpan ?? 24,
    pull,
    push,
    block,
    whiteSpace = <>&nbsp;&nbsp;</>,
    inlineLayout,
    labelCol = globalLabelCol,
    wrapperCol = globalWrapperCol,
    width = globalWidth,
    visible: _,
    labelTip,
    ...others
  } = formItem;

  const fields = Array.isArray(field) ? field : [field];
  const isInline = layout === 'inline';

  // 注册field到formStore
  fields.forEach((field) => {
    const { name } = field;
    name && register(name, field);
  });

  const unmount$ = useUnmount();
  const visible = useWhere(formItem, 'visible');
  const [formItemVisible, setFormItemVisible] = useState(true);

  useEffect(() => {
    parseExpr(
      { visible: formItem.visible },
      field$s,
      (path, value) => {
        if (typeof value === 'boolean') {
          setFormItemVisible(value);
          fields.forEach((field) => {
            const { name } = field;
            name && dispatch(name, { visible: value }); // 可见状态同步到field
          });
        }
      },
      unmount$,
    );
  }, []);

  const names = fields.map((field) => field.name).filter(Boolean) as string[];

  const states = names.length
    ? useObservable(
        (_, inputs$) =>
          inputs$.pipe(
            // 切换visible状态后重新计算
            switchMap(() => $(names)),
            debounceTime(300),
            map((states: IField[]) => {
              // 过滤不可见field
              return states.filter((state) => state.visible !== false);
            }),
          ),
        [] as IField[],
        [visible],
      )
    : undefined;

  const state = states?.find((state) => state.error);
  const errorText = typeof state?.error === 'object' ? state?.error.message : state?.error;

  // field rules include required prop
  const isRequired = states?.some(
    (state) =>
      state.rules &&
      state.rules.some((rule) => {
        if ('required' in rule) {
          return !!rule.required;
        }
        return false;
      }),
  );
  const isEditable = states?.every((state) => state.displayAs !== 'preview');
  const isLayoutTable = layout === 'table';

  // table 不展示label
  const { label: _label } = others;
  const tipProps =
    labelTip && typeof labelTip === 'object' && 'title' in labelTip
      ? labelTip
      : {
          title: labelTip,
        };

  const label = isLayoutTable ? undefined : labelTip ? (
    <Tooltip {...tipProps}>{_label}</Tooltip>
  ) : (
    _label
  );

  const inlineFields = fields.map((field, index) => <Field key={index} field={field} />);

  const formItemElement = useMemo(
    () => (
      <FormCol width={width} layout={layout} span={span} push={push} pull={pull}>
        <Form.Item
          {...others}
          labelCol={{ span: isInline ? undefined : labelCol }}
          wrapperCol={{ span: isInline ? undefined : wrapperCol }}
          label={label}
          // validateStatus={state ? 'error' : undefined}
          help={<span style={{ color: '#f5222d' }}>{errorText}</span>}
          required={isEditable && isRequired}
          style={{ marginBottom: 0 }}
        >
          {replaceStr(inlineLayout, inlineFields) ??
            replaceJSXChildren(inlineLayout, inlineFields, formStore) ??
            inlineFields.map((field, index) => (
              <span key={index} style={{ marginRight: index === fields.length - 1 ? 0 : 4 }}>
                {field}{' '}
              </span>
            ))}
        </Form.Item>
      </FormCol>
    ),
    [
      formItem,
      layout,
      globalSpan,
      globalLabelCol,
      globalWrapperCol,
      isRequired,
      isEditable,
      errorText,
    ],
  );

  useEffect(() => {
    plugins.formItemMounted.call(formItem, formStore);
  }, []);

  if (visible === false || formItemVisible === false) {
    return null;
  }

  if (isInline) return formItemElement;
  if (block) return <div style={{ width: '100%' }}>{formItemElement}</div>;
  return formItemElement;
};

export default FormItem;

const splitStrs = (inlineLayout: string) => {
  const strs: string[] = [];
  let prev = 0;
  let index = 0;
  while (index <= inlineLayout.length - 1) {
    if (inlineLayout[index] === setting.inlineTag && inlineLayout[index - 1] !== '\\') {
      const str = inlineLayout.slice(prev, index);
      strs.push(str);
      prev = index + 1;
    }
    if (index === inlineLayout.length - 1) {
      strs.push(inlineLayout.slice(prev, index + 1));
    }
    ++index;
  }
  return strs.map((str) =>
    str.replace(new RegExp(`\\\\${setting.inlineTag}`, 'g'), setting.inlineTag),
  );
};

const replaceStr = (inlineLayout: IFormItem['inlineLayout'], fields: JSX.Element[]) => {
  if (typeof inlineLayout !== 'string') return;
  const strs = splitStrs(inlineLayout);
  const ret: ReactNode[] = [...fields];
  let index = 0;

  while (strs.length) {
    ret.splice(index + index, 0, strs.shift());
    ++index;
  }
  return ret;
};

const replaceJSXChildren = (
  node: IFormItem['inlineLayout'],
  fields: JSX.Element[],
  formStore: FormStore,
) => {
  if (!isValidElement(node)) return;
  const children = React.Children.map(node.props.children, (item) => {
    if (typeof item === 'string' && item.includes(setting.inlineTag)) {
      return replaceStr(item, fields);
    }
    return isElement(item) ? cloneElement(item, { formStore }) : item;
  });

  return cloneElement(node, {}, ...children);
};
