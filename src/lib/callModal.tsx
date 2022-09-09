import React, { ReactNode, useState } from 'react';
import { Modal } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContext, AppContextValue } from '../components/app';

export const callModal = (
  props: ModalFuncProps & {
    buttons?: ReactNode[];
    appContextValue: AppContextValue;
  },
): Promise<{ destory: Function }> => {
  const modalRoot = document.createElement('div');
  document.body.appendChild(modalRoot);

  const { content, buttons, appContextValue, ...modalProps } = props;

  return new Promise((resolve) => {
    const Content = () => {
      const [visible, setVisible] = useState(true);

      const destory = () => {
        setVisible(false);
        setTimeout(() => {
          unmountComponentAtNode(modalRoot);
          modalRoot.parentNode?.removeChild(modalRoot);
        }, 300);
      };

      resolve({ destory });

      return (
        <AppContext.Provider value={appContextValue}>
          <Modal
            okText="确定"
            cancelText="取消"
            visible={visible}
            onCancel={() => {
              destory();
            }}
            onOk={() => {
              destory();
            }}
            footer={buttons}
            {...modalProps}
          >
            {content}
          </Modal>
        </AppContext.Provider>
      );
    };

    render(<Content />, modalRoot);
  });
};
