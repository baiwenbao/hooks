import React from 'react';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { IField, IField$s, IField$, Values, Option } from '../type/field';
import { AxiosInstance } from 'axios';
import { IForm } from '../type/form';
export declare const isDateField: (type?: import("../type/field").FieldType | undefined) => boolean;
export declare const isOptionField: (type: IField['type']) => boolean;
export declare const getFieldValue: (type: IField['type'] | undefined, value: IField['value']) => import("../type/field").Value;
declare type CreateFormProps = {
    name?: string | Symbol;
};
declare type FieldSelectOptions = {
    include?: string | string[];
    exclude?: string | string[];
};
declare const createFormStore: (props?: CreateFormProps | undefined) => {
    name: string | Symbol | undefined;
    field$s: IField$s;
    dispatch: (name: string | undefined, updateState: Partial<IField>, from?: string | undefined) => void;
    register: (name: string, _initial: IField) => void;
    remove: (names?: string | string[] | undefined) => void;
    pick: (names: string | string[]) => IField$[];
    $: {
        (names: string): BehaviorSubject<IField>;
        (names: string, options?: FieldSelectOptions | undefined): Observable<IField>;
        (names: string[], options?: FieldSelectOptions | undefined): Observable<IField[]>;
    };
    validate: (names?: string | string[] | undefined, from?: string | undefined) => Promise<void>;
    getValues: (names?: string | string[] | undefined) => {
        [name: string]: any;
    };
    getErrors: (names?: string | string[] | undefined) => {
        [name: string]: string;
    } | null;
    submit: (callback: (errors: {
        [name: string]: string;
    } | null, values: {
        [name: string]: any;
    }) => void | Promise<unknown>) => Promise<void>;
    setValues: (values: Values, from?: string | undefined) => void;
    resetFields: (_keys?: string[] | undefined, from?: string | undefined) => void;
    setStatus: (status?: IField['displayAs']) => void;
    plugins: {
        field: import("tapable").SyncWaterfallHook<[import("./hooks").CustomFieldProps], JSX.Element>;
        format: import("tapable").SyncWaterfallHook<[import("../type/field").Value], import("tapable").UnsetAdditionalOptions>;
        loadConfig: import("tapable").SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
        initFormStore: import("tapable").SyncHook<[FormStore, IForm], void, import("tapable").UnsetAdditionalOptions>;
        register: import("tapable").SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>, FormStore], import("tapable").UnsetAdditionalOptions>;
        beforeDispatch: import("tapable").SyncHook<[string, Partial<Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>>, FormStore], void, import("tapable").UnsetAdditionalOptions>;
        dispatch: import("tapable").SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>, FormStore, Partial<Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>>], import("tapable").UnsetAdditionalOptions>;
        fieldMounted: import("tapable").SyncHook<[Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>, FormStore], void, import("tapable").UnsetAdditionalOptions>;
        formItemMounted: import("tapable").SyncHook<[import("../type/formitem").IFormItem, FormStore], void, import("tapable").UnsetAdditionalOptions>;
        getValue: import("tapable").SyncWaterfallHook<[import("../type/field").Value, Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>, FormStore], import("tapable").UnsetAdditionalOptions>;
        beforeSubmit: import("tapable").SyncWaterfallHook<[false | Values, FormStore], import("tapable").UnsetAdditionalOptions>;
        submit: import("tapable").SyncHook<[Values, FormStore], void, import("tapable").UnsetAdditionalOptions>;
        blur: import("tapable").SyncHook<[Readonly<import("../type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../type/field").Value;
            initialValue?: import("../type/field").Value;
            type: import("../type/field").FieldType;
            tip?: React.ReactNode | import("antd").TooltipProps;
            displayAs?: "disabled" | "preview" | "edit" | undefined;
            link?: {
                type: "link" | "a";
                target?: "_blank" | undefined;
                url: string;
            } | undefined;
            placeholder?: string | undefined;
            required?: string | boolean | undefined;
            requiredMsg?: string | undefined;
            format?: string | ("yuan" | "fen" | "percent" | "thousands" | "float" | "time")[] | undefined;
            options?: string[] | import("../type/field").AsyncOption | Option[] | undefined;
            __options__?: Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: Option | Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
            width?: string | number | undefined;
            label?: React.ReactNode;
            submit?: boolean | undefined;
            custom?: JSX.Element | undefined;
            listener?: {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            } | {
                watch: string | string[];
                condition?: string | undefined;
                set: {
                    [x: string]: unknown;
                };
            }[] | undefined;
            error?: {
                message: string;
                index?: number | undefined;
            } | undefined;
            __from__?: string | undefined;
            multiple?: boolean | undefined;
            flatten?: boolean | undefined;
            maxSize?: number | undefined;
            getResUrl?: ((res: any) => string) | undefined;
            submitOnEnter?: boolean | undefined;
            props?: import("antd").TimePickerProps | import("antd").SelectProps<import("antd/lib/select").LabeledValue, import("rc-select/lib/Select").DefaultOptionType> | import("antd").CheckboxProps | import("antd").RadioProps | (import("antd").UploadProps<any> & {
                maxSize?: number | undefined;
                getResUrl?: ((res: any) => string) | undefined;
            }) | import("antd").InputProps | import("antd").DatePickerProps | import("antd/lib/input").TextAreaProps | import("rc-tree-select").TreeSelectProps<any, import("rc-tree-select/lib/TreeSelect").DefaultOptionType> | undefined;
        }> & Partial<Pick<IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
            [x: string]: unknown;
        }>, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    };
    submitEvent$: Subject<unknown>;
};
export interface FormStore extends ReturnType<typeof createFormStore> {
    childFormStoresRefs?: React.MutableRefObject<FormStore[]>[];
}
export declare const FormContext: React.Context<{
    formStore: FormStore;
    request?: AxiosInstance | undefined;
}>;
export declare const SchemaContext: React.Context<{
    schema: IForm;
}>;
export default createFormStore;
