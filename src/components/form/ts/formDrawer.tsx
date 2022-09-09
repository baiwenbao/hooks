import React, { useEffect, useState } from 'react';
import { Drawer, Button, DrawerProps, Row, Space } from 'antd';
import useForm from '../index';
import { IForm } from '../type/form';
import { Values } from '../type/field';
import { render, unmountComponentAtNode } from 'react-dom';
import { FormStore } from './createFormStore';
import { Action } from '../../action';
import { omit } from 'lodash';

declare type Props = DrawerProps & {
  values?: Values;
  formConfig: IForm;
  submit?(values: Values): Promise<any>;
  formWrapper?: (form: JSX.Element) => JSX.Element;
  // mounted?(formStore: FormStore): void
};

const callFormDrawer = (props: Props): Promise<{ formStore: FormStore; destory: Function }> => {
  const modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  const { formConfig, submit, values, formWrapper, ...modalProps } = props;

  return new Promise((resolve) => {
    const Content = () => {
      const [visible, setVisible] = useState(false);
      const { form, formStore } = useForm({ formConfig: omit(formConfig, 'actions') });
      const { remove } = formStore;

      const destory = () => {
        setVisible(false);
        setTimeout(() => {
          remove();
          unmountComponentAtNode(modalRoot);
          modalRoot.parentNode?.removeChild(modalRoot);
        }, 300);
      };

      useEffect(() => {
        if (!formStore) return;
        resolve({ formStore, destory });
        // formStore执行完register后在setValues
        setTimeout(() => {
          values && formStore.setValues(values);
        });
      }, [formStore]);

      useEffect(() => {
        setVisible(true);
      }, []);

      return (
        <Drawer
          visible={visible}
          onClose={destory}
          {...modalProps}
          footer={
            <Row justify="end">
              <Space>
                {formConfig.actions?.map((props, index) => {
                  return <Action {...props} key={index} context={{ formStore, cancle: destory }} />;
                })}
              </Space>
            </Row>
          }
        >
          {formWrapper ? formWrapper(form) : form}
        </Drawer>
      );
    };

    render(<Content />, modalRoot);
  });
};

export default callFormDrawer;
