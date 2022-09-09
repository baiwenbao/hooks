import React, { useMemo, useEffect, useRef } from 'react';
import createFormStore, { FormContext, FormStore, SchemaContext } from './ts/createFormStore';
import { IForm } from './type/form';
import { Form, Row, Col } from 'antd';
import FormItem from './components/formitem';
import FormGroups from './components/formGroup';
import plugins from './ts/hooks';
import { default as useRegister } from './ts/useRegister';
import { AxiosInstance } from 'axios';
import useFormSchema from './ts/useFormSchema';
import './plugins';
import { setting } from './ts/option';
import { Action } from '../action';
import callFormModal from './ts/formModal';
import callFormDrawer from './ts/formDrawer';

const defineFormConfig = (formConfig: IForm) => {
  return formConfig;
};

export const formStoreMap = new Map<string | Symbol, FormStore>();

const useForm = ({
  formConfig,
  request = setting.request,
}: {
  formConfig: IForm;
  request?: AxiosInstance;
}) => {
  const { name, labelAlign } = formConfig;
  const formStore = useMemo(() => createFormStore({ name }), []);
  const { plugins } = formStore;
  /**调用注册loadConfig plugins */
  const enhanceFormConfig = plugins.loadConfig.call(formConfig) as IForm;

  const { schema, updateSchema } = useFormSchema(enhanceFormConfig);

  const {
    formItems,
    layout = 'horizontal',
    labelCol = 4,
    wrapperCol = 20,
    groups,
    buttons = [],
    justify,
    gutter = 16,
    span = 24,
    width,
    actions,
  } = schema;

  const isInline = layout === 'inline';

  const groupElement = <FormGroups groups={groups} />;

  const formItemWrapperCol =
    isInline || groups || typeof width !== 'undefined' ? {} : { offset: labelCol / (24 / span) };
  const formItemStyle = {
    marginLeft:
      typeof width !== 'undefined'
        ? (width / 24) * labelCol + (typeof gutter === 'number' ? gutter : gutter[0]) / 2
        : 0,
    marginRight: 0,
  };

  const actionButtons = actions?.map((actionProps, index) => {
    return <Action key={index} context={{ formStore }} {...actionProps} />;
  });

  if (actionButtons) {
    buttons.push(...actionButtons);
  }

  const buttonElement = !!buttons?.length && (
    <Col>
      <Form.Item wrapperCol={formItemWrapperCol} style={formItemStyle}>
        {buttons?.map((button, index) => {
          const style = {
            marginRight: index === buttons.length - 1 ? 0 : 8,
          };
          return (
            <span key={index} style={style}>
              {button}
            </span>
          );
        })}
      </Form.Item>
    </Col>
  );

  const formElement = (
    <Row justify={justify} gutter={isInline ? undefined : gutter}>
      {formItems?.map((formItem, index) => {
        return <FormItem formItem={formItem} key={index} />;
      })}
      {isInline && buttonElement}
    </Row>
  );

  useEffect(() => {
    plugins.initFormStore.call(formStore, formConfig);

    formStore.name && formStoreMap.set(formStore.name, formStore);
    return () => {
      // 清理formStore
      formStore.remove();
      formStore.name && formStoreMap.delete(formStore.name);
    };
  }, [formStore]);

  const formContextRef = useRef({
    formStore,
    request,
  });

  const schemaContextValue = useMemo(
    () => ({
      schema,
    }),
    [schema],
  );

  const formProvider = useMemo(() => {
    return (
      <FormContext.Provider value={formContextRef.current}>
        <SchemaContext.Provider value={schemaContextValue}>
          <Form
            // name={name}
            labelAlign={labelAlign}
            layout={layout as Exclude<IForm['layout'], 'table'>}
            labelCol={{ span: labelCol }}
            wrapperCol={{ span: wrapperCol }}
            labelWrap={true}
            style={{ wordBreak: 'break-all' }}
          >
            {formItems && formElement}
            {groups && groupElement}
            {!isInline && buttons && buttonElement}
          </Form>
        </SchemaContext.Provider>
      </FormContext.Provider>
    );
  }, [schema]);

  return {
    formStore,
    updateSchema,
    updateConfig: updateSchema,
    form: formProvider,
  };
};

export default useForm;

export { plugins, useRegister, useForm, defineFormConfig, setting, callFormModal, callFormDrawer };
