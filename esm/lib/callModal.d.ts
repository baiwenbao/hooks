import React, { ReactNode } from 'react';
import { ModalFuncProps } from 'antd/lib/modal';
import { AppContextValue } from '../components/app';
export declare const callModal: (props: ModalFuncProps & {
    buttons?: React.ReactNode[] | undefined;
    appContextValue: AppContextValue;
}) => Promise<{
    destory: Function;
}>;
