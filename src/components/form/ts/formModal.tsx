import React, { useEffect, useState } from 'react';
import { Modal, Row, Space } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';
import useForm from '../index';
import { IForm } from '../type/form';
import { Values } from '../type/field';
import { render, unmountComponentAtNode } from 'react-dom';
import { FormStore } from './createFormStore';
import { Action, runApiAction } from '../../action';
import omit from 'lodash/omit';

type Props = ModalFuncProps & {
  values?: Values;
  formConfig: IForm;
  submit?: (values: Values) => Promise<any>;
  formWrapper?: (form: JSX.Element) => JSX.Element;
};

const callFormModal = (props: Props): Promise<{ formStore: FormStore; destory: Function }> => {
  const modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  const { formConfig, submit, values, formWrapper, ...modalProps } = props;

  return new Promise((resolve) => {
    const Content = () => {
      const [visible, setVisible] = useState(true);
      const { form, formStore } = useForm({ formConfig: omit({ ...formConfig }, 'actions') });
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

      return (
        <Modal
          okText="确定"
          cancelText="取消"
          visible={visible}
          onCancel={() => {
            destory();
          }}
          onOk={
            !!submit
              ? () => {
                  formStore.submit((err, values) => {
                    if (err) return;
                    if (submit) {
                      return submit(values).then(() => destory());
                    }
                  });
                }
              : undefined
          }
          footer={
            !submit ? (
              <Row justify="end">
                <Space>
                  {formConfig.actions?.map((props, index) => {
                    return (
                      <Action {...props} key={index} context={{ formStore, cancle: destory }} />
                    );
                  })}
                </Space>
              </Row>
            ) : undefined
          }
          {...modalProps}
        >
          {formWrapper ? formWrapper(form) : form}
        </Modal>
      );
    };

    render(<Content />, modalRoot);
  });
};

export default callFormModal;
