/// <reference types="react" />
import { BehaviorSubject, Subject } from 'rxjs';
import { SyncWaterfallHook, SyncHook } from 'tapable';
import { IField, Value, Values } from '../type/field';
import { IForm } from '../type/form';
import { IFormItem } from '../type/formitem';
import { FormStore } from './createFormStore';
export declare type CustomFieldProps = {
    fieldState: IField;
    formStore: FormStore;
    internalValue$: BehaviorSubject<Value>;
    internalValue: Value;
    blur$: Subject<undefined>;
    change$: Subject<undefined>;
};
/**form配置插件 */
declare const pluginsFactory: <T extends FormStore>() => {
    /**自定义field */
    field: SyncWaterfallHook<[CustomFieldProps], JSX.Element>;
    /**自定义format */
    format: SyncWaterfallHook<[Value], import("tapable").UnsetAdditionalOptions>;
    /**配置预处理 */
    loadConfig: SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
    /** form初始化 */
    initFormStore: SyncHook<[T, IForm], void, import("tapable").UnsetAdditionalOptions>;
    register: SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**dispatch中处理 */
    beforeDispatch: SyncHook<[string, Partial<Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**dispatch中处理 */
    dispatch: SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**控件mounted */
    fieldMounted: SyncHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**formItem mounted */
    formItemMounted: SyncHook<[IFormItem, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    getValue: SyncWaterfallHook<[Value, Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**提交前执行自定义逻辑，如返回false将阻止提交 */
    beforeSubmit: SyncWaterfallHook<[false | Values, FormStore], import("tapable").UnsetAdditionalOptions>;
    /**提交后处理 */
    submit: SyncHook<[Values, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    blur: SyncHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
declare const plugins: {
    /**自定义field */
    field: SyncWaterfallHook<[CustomFieldProps], JSX.Element>;
    /**自定义format */
    format: SyncWaterfallHook<[Value], import("tapable").UnsetAdditionalOptions>;
    /**配置预处理 */
    loadConfig: SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
    /** form初始化 */
    initFormStore: SyncHook<[FormStore, IForm], void, import("tapable").UnsetAdditionalOptions>;
    register: SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**dispatch中处理 */
    beforeDispatch: SyncHook<[string, Partial<Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**dispatch中处理 */
    dispatch: SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**控件mounted */
    fieldMounted: SyncHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**formItem mounted */
    formItemMounted: SyncHook<[IFormItem, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    getValue: SyncWaterfallHook<[Value, Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**提交前执行自定义逻辑，如返回false将阻止提交 */
    beforeSubmit: SyncWaterfallHook<[false | Values, FormStore], import("tapable").UnsetAdditionalOptions>;
    /**提交后处理 */
    submit: SyncHook<[Values, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    blur: SyncHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
export declare type FormPlugins = ReturnType<typeof pluginsFactory>;
export declare const internalPluginsFactory: () => {
    /**自定义field */
    field: SyncWaterfallHook<[CustomFieldProps], JSX.Element>;
    /**自定义format */
    format: SyncWaterfallHook<[Value], import("tapable").UnsetAdditionalOptions>;
    /**配置预处理 */
    loadConfig: SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
    /** form初始化 */
    initFormStore: SyncHook<[FormStore, IForm], void, import("tapable").UnsetAdditionalOptions>;
    register: SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**dispatch中处理 */
    beforeDispatch: SyncHook<[string, Partial<Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**dispatch中处理 */
    dispatch: SyncWaterfallHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**控件mounted */
    fieldMounted: SyncHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**formItem mounted */
    formItemMounted: SyncHook<[IFormItem, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    getValue: SyncWaterfallHook<[Value, Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
    /**提交前执行自定义逻辑，如返回false将阻止提交 */
    beforeSubmit: SyncWaterfallHook<[false | Values, FormStore], import("tapable").UnsetAdditionalOptions>;
    /**提交后处理 */
    submit: SyncHook<[Values, FormStore], void, import("tapable").UnsetAdditionalOptions>;
    blur: SyncHook<[Readonly<import("../type/field").Filter<{
        name?: string | undefined;
        valuePropName?: string | undefined;
        value?: Value;
        initialValue?: Value;
        type: import("../type/field").FieldType;
        tip?: import("react").ReactNode | import("antd").TooltipProps;
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
        options?: string[] | import("../type/field").AsyncOption | import("../type/field").Option[] | undefined;
        __options__?: import("../type/field").Option[] | undefined;
        __visible__?: boolean | undefined;
        option?: import("../type/field").Option | import("../type/field").Option[] | undefined;
        trigger?: "change" | "blur" | undefined;
        validate?: string | undefined;
        validateMsg?: string | undefined;
        rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
        disabled?: boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        visible?: string | boolean | import("../type/field").Where | import("../type/field").Where[] | undefined;
        width?: string | number | undefined;
        label?: import("react").ReactNode;
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
export default plugins;
