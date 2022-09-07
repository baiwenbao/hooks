import React, { CSSProperties } from 'react';
import { ButtonProps } from 'antd/lib/button';
import { ModalProps } from 'antd/lib/modal';
import { IForm } from '../form/type/form';
import { Values } from '../form/type/field';
import { IApp } from '../app';
import { FormStore } from '../form/ts/createFormStore';
import { Filter } from '../form/type/field';
export declare type Api = string | {
    url: string;
    method?: 'post' | 'get' | 'put' | 'delete';
    headers?: any;
    data?: object | ((values: object) => object);
    params?: object | ((values: object) => object);
    path?: string;
    successText?: string;
    successCallback?: Function;
    errorText?: string;
};
declare type ActionType = 'url' | 'link' | 'api' | 'modal' | 'cancel' | 'reset' | 'submit';
export declare type ActionProps<T extends ActionType = ActionType> = Filter<{
    name?: string;
    location?: string;
    label: string;
    type?: ButtonProps['type'];
    actionType: T;
    url: T extends 'url' ? string : never;
    target: T extends 'url' | 'link' ? '_blank' : never;
    link: T extends 'link' ? string : never;
    api: T extends 'api' | 'submit' ? Api : never;
    modal: T extends 'modal' ? {
        title: string;
        width: ModalProps['width'];
        body: {
            type?: 'form';
            formConfig: IForm;
            values?: Values;
            initialApi?: Api;
        } | IApp;
        action: ActionProps<'api'>;
        actions?: Array<ActionProps<'url'> | ActionProps<'link'> | ActionProps<'api'> | ActionProps<'modal'> | ActionProps<'cancel'> | ActionProps<'reset'> | ActionProps<'submit'>>;
    } & Omit<ModalProps, 'content'> : never;
    confirmText?: string;
    reset?: T extends 'reset' ? Function : never;
    submit?: T extends 'submit' ? Function : never;
    size?: 'small' | 'large';
    visible?: string;
    style?: CSSProperties;
    context?: {
        formStore?: FormStore;
        cancle?: Function;
    };
}>;
export declare type AllActionProps = ActionProps<'url'> | ActionProps<'link'> | ActionProps<'api'> | ActionProps<'modal'> | ActionProps<'cancel'> | ActionProps<'reset'> | ActionProps<'submit'>;
export declare const runApiAction: (api: Api, values?: Values | undefined, confirmText?: string | undefined, disabledRef?: React.MutableRefObject<boolean> | undefined) => Promise<any>;
export declare const Action: (props: AllActionProps) => JSX.Element | null;
export {};
