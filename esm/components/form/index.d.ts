import React from 'react';
import { FormStore } from './ts/createFormStore';
import { IForm } from './type/form';
import plugins from './ts/hooks';
import { default as useRegister } from './ts/useRegister';
import { AxiosInstance } from 'axios';
import './plugins';
import { setting } from './ts/option';
import callFormModal from './ts/formModal';
import callFormDrawer from './ts/formDrawer';
declare const defineFormConfig: (formConfig: IForm) => IForm;
export declare const formStoreMap: Map<string | Symbol, FormStore>;
declare const useForm: ({ formConfig, request, }: {
    formConfig: IForm;
    request?: AxiosInstance | undefined;
}) => {
    formStore: {
        name: string | Symbol | undefined;
        field$s: import("./type/field").IField$s;
        dispatch: (name: string | undefined, updateState: Partial<Readonly<import("./type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("./type/field").Value;
            initialValue?: import("./type/field").Value;
            type: import("./type/field").FieldType;
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
            options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
            __options__?: import("./type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
            visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
        }>>, from?: string | undefined) => void;
        register: (name: string, _initial: Readonly<import("./type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("./type/field").Value;
            initialValue?: import("./type/field").Value;
            type: import("./type/field").FieldType;
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
            options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
            __options__?: import("./type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
            visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
        }>) => void;
        remove: (names?: string | string[] | undefined) => void;
        pick: (names: string | string[]) => import("./type/field").IField$[];
        $: {
            (names: string): import("rxjs").BehaviorSubject<Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            }>>;
            (names: string, options?: {
                include?: string | string[] | undefined;
                exclude?: string | string[] | undefined;
            } | undefined): import("rxjs").Observable<Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            }>>;
            (names: string[], options?: {
                include?: string | string[] | undefined;
                exclude?: string | string[] | undefined;
            } | undefined): import("rxjs").Observable<Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            }>[]>;
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
        setValues: (values: import("./type/field").Values, from?: string | undefined) => void;
        resetFields: (_keys?: string[] | undefined, from?: string | undefined) => void;
        setStatus: (status?: "disabled" | "preview" | "edit" | undefined) => void;
        plugins: {
            field: import("tapable").SyncWaterfallHook<[import("./ts/hooks").CustomFieldProps], JSX.Element>;
            format: import("tapable").SyncWaterfallHook<[import("./type/field").Value], import("tapable").UnsetAdditionalOptions>;
            loadConfig: import("tapable").SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
            initFormStore: import("tapable").SyncHook<[FormStore, IForm], void, import("tapable").UnsetAdditionalOptions>;
            register: import("tapable").SyncWaterfallHook<[Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            beforeDispatch: import("tapable").SyncHook<[string, Partial<Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            dispatch: import("tapable").SyncWaterfallHook<[Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            }>, FormStore, Partial<Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            fieldMounted: import("tapable").SyncHook<[Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            formItemMounted: import("tapable").SyncHook<[import("./type/formitem").IFormItem, FormStore], void, import("tapable").UnsetAdditionalOptions>;
            getValue: import("tapable").SyncWaterfallHook<[import("./type/field").Value, Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
            beforeSubmit: import("tapable").SyncWaterfallHook<[false | import("./type/field").Values, FormStore], import("tapable").UnsetAdditionalOptions>;
            submit: import("tapable").SyncHook<[import("./type/field").Values, FormStore], void, import("tapable").UnsetAdditionalOptions>;
            blur: import("tapable").SyncHook<[Readonly<import("./type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("./type/field").Value;
                initialValue?: import("./type/field").Value;
                type: import("./type/field").FieldType;
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
                options?: string[] | import("./type/field").AsyncOption | import("./type/field").Option[] | undefined;
                __options__?: import("./type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("./type/field").Option | import("./type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
                visible?: string | boolean | import("./type/field").Where | import("./type/field").Where[] | undefined;
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
        submitEvent$: import("rxjs").Subject<unknown>;
    };
    updateSchema: (schemaPart: Partial<IForm> & {
        [x: string]: any;
    }) => void;
    updateConfig: (schemaPart: Partial<IForm> & {
        [x: string]: any;
    }) => void;
    form: JSX.Element;
};
export default useForm;
export { plugins, useRegister, useForm, defineFormConfig, setting, callFormModal, callFormDrawer };
