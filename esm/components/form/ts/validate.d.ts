import { FormStore } from './createFormStore';
export declare type Error = {
    field: string;
    message: string;
    index?: number;
};
export declare const validateFields: (fieldNames: string[], formStore: Pick<FormStore, 'field$s' | 'dispatch'>, from?: string | undefined) => Promise<void>;
