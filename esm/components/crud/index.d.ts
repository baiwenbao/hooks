/// <reference types="rc-pagination" />
import React from 'react';
import { IField, Values } from '../form/type/field';
import { IForm } from '../form/type/form';
import { AllActionProps } from '../action';
import { ColumnProps } from 'antd/lib/table';
declare type ShowScence = 'add' | 'edit' | 'list' | 'search';
declare type Api = string | {
    url: string;
    method?: 'post' | 'get';
    headers?: any;
    data?: any;
    params?: any;
    path?: string;
};
declare type Column = {
    label: string;
    field: IField;
    location?: ShowScence | ShowScence[];
};
declare type CrudProps = {
    searchApi: Api;
    listPath: string;
    totalPath: string;
    defaultPageSize?: number;
    manual?: boolean;
    rowKey: string;
    columns: Column[];
    actions: (AllActionProps & {
        location: 'header' | 'search' | 'list';
    })[];
};
export declare const defineCrudConfig: (config: CrudProps) => CrudProps;
declare const useCrud: <DataItem extends object>(props: CrudProps) => {
    crud: JSX.Element;
    list: {
        tableProps: {
            dataSource: DataItem[] | undefined;
            loading: boolean;
            error: Error | undefined;
            pagination: {
                showQuickJumper: boolean;
                showSizeChanger: boolean;
                position?: ("topLeft" | "topCenter" | "topRight" | "bottomLeft" | "bottomCenter" | "bottomRight")[] | undefined;
                size?: "small" | "default" | undefined;
                responsive?: boolean | undefined;
                role?: string | undefined;
                totalBoundaryShowSizeChanger?: number | undefined;
                onChange?: ((page: number, pageSize: number) => void) | undefined;
                onShowSizeChange?: ((current: number, size: number) => void) | undefined;
                itemRender?: ((page: number, type: "page" | "next" | "prev" | "jump-prev" | "jump-next", element: React.ReactNode) => React.ReactNode) | undefined;
                showTotal?: ((total: number, range: [number, number]) => React.ReactNode) | undefined;
                className?: string | undefined;
                selectPrefixCls?: string | undefined;
                prefixCls?: string | undefined;
                pageSizeOptions?: string[] | number[] | undefined;
                current?: number | undefined;
                defaultCurrent?: number | undefined;
                total: number | undefined;
                pageSize?: number | undefined;
                defaultPageSize?: number | undefined;
                hideOnSinglePage?: boolean | undefined;
                showLessItems?: boolean | undefined;
                showPrevNextJumpers?: boolean | undefined;
                showTitle?: boolean | undefined;
                simple?: boolean | undefined;
                disabled?: boolean | undefined;
                locale?: import("rc-pagination").PaginationLocale | undefined;
                style?: React.CSSProperties | undefined;
                selectComponentClass?: React.ComponentType<{}> | undefined;
                prevIcon?: React.ReactNode | React.ComponentType<{}>;
                nextIcon?: React.ReactNode | React.ComponentType<{}>;
                jumpPrevIcon?: React.ReactNode | React.ComponentType<{}>;
                jumpNextIcon?: React.ReactNode | React.ComponentType<{}>;
            };
        };
        listColumns: ColumnProps<any>[];
    };
    search: {
        form: JSX.Element;
        formStore: {
            name: string | Symbol | undefined;
            field$s: import("../form/type/field").IField$s;
            dispatch: (name: string | undefined, updateState: Partial<Readonly<import("../form/type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("../form/type/field").Value;
                initialValue?: import("../form/type/field").Value;
                type: import("../form/type/field").FieldType;
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
                options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                __options__?: import("../form/type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
            register: (name: string, _initial: Readonly<import("../form/type/field").Filter<{
                name?: string | undefined;
                valuePropName?: string | undefined;
                value?: import("../form/type/field").Value;
                initialValue?: import("../form/type/field").Value;
                type: import("../form/type/field").FieldType;
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
                options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                __options__?: import("../form/type/field").Option[] | undefined;
                __visible__?: boolean | undefined;
                option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                trigger?: "change" | "blur" | undefined;
                validate?: string | undefined;
                validateMsg?: string | undefined;
                rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
            pick: (names: string | string[]) => import("../form/type/field").IField$[];
            $: {
                (names: string): import("rxjs").BehaviorSubject<Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                } | undefined): import("rxjs").Observable<Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                } | undefined): import("rxjs").Observable<Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
            setValues: (values: Values, from?: string | undefined) => void;
            resetFields: (_keys?: string[] | undefined, from?: string | undefined) => void;
            setStatus: (status?: "disabled" | "preview" | "edit" | undefined) => void;
            plugins: {
                field: import("tapable").SyncWaterfallHook<[import("../form/ts/hooks").CustomFieldProps], JSX.Element>;
                format: import("tapable").SyncWaterfallHook<[import("../form/type/field").Value], import("tapable").UnsetAdditionalOptions>;
                loadConfig: import("tapable").SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
                initFormStore: import("tapable").SyncHook<[import("../../useForm").FormStore, IForm], void, import("tapable").UnsetAdditionalOptions>;
                register: import("tapable").SyncWaterfallHook<[Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                }>, import("../../useForm").FormStore], import("tapable").UnsetAdditionalOptions>;
                beforeDispatch: import("tapable").SyncHook<[string, Partial<Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                }>>, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
                dispatch: import("tapable").SyncWaterfallHook<[Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                }>, import("../../useForm").FormStore, Partial<Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                fieldMounted: import("tapable").SyncHook<[Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                }>, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
                formItemMounted: import("tapable").SyncHook<[import("../form/type/formitem").IFormItem, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
                getValue: import("tapable").SyncWaterfallHook<[import("../form/type/field").Value, Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                }>, import("../../useForm").FormStore], import("tapable").UnsetAdditionalOptions>;
                beforeSubmit: import("tapable").SyncWaterfallHook<[false | Values, import("../../useForm").FormStore], import("tapable").UnsetAdditionalOptions>;
                submit: import("tapable").SyncHook<[Values, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
                blur: import("tapable").SyncHook<[Readonly<import("../form/type/field").Filter<{
                    name?: string | undefined;
                    valuePropName?: string | undefined;
                    value?: import("../form/type/field").Value;
                    initialValue?: import("../form/type/field").Value;
                    type: import("../form/type/field").FieldType;
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
                    options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
                    __options__?: import("../form/type/field").Option[] | undefined;
                    __visible__?: boolean | undefined;
                    option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
                    trigger?: "change" | "blur" | undefined;
                    validate?: string | undefined;
                    validateMsg?: string | undefined;
                    rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
                    disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
                    visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
                }>, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
            };
            submitEvent$: import("rxjs").Subject<unknown>;
        };
    };
    plugins: {
        tableColumns: import("tapable").SyncWaterfallHook<[ColumnProps<any>[]], import("tapable").UnsetAdditionalOptions>;
    };
    formplugins: {
        field: import("tapable").SyncWaterfallHook<[import("../form/ts/hooks").CustomFieldProps], JSX.Element>;
        format: import("tapable").SyncWaterfallHook<[import("../form/type/field").Value], import("tapable").UnsetAdditionalOptions>;
        loadConfig: import("tapable").SyncWaterfallHook<[IForm], import("tapable").UnsetAdditionalOptions>;
        initFormStore: import("tapable").SyncHook<[import("../../useForm").FormStore, IForm], void, import("tapable").UnsetAdditionalOptions>;
        register: import("tapable").SyncWaterfallHook<[Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        }>, import("../../useForm").FormStore], import("tapable").UnsetAdditionalOptions>;
        beforeDispatch: import("tapable").SyncHook<[string, Partial<Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        }>>, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
        dispatch: import("tapable").SyncWaterfallHook<[Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        }>, import("../../useForm").FormStore, Partial<Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        fieldMounted: import("tapable").SyncHook<[Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        }>, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
        formItemMounted: import("tapable").SyncHook<[import("../form/type/formitem").IFormItem, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
        getValue: import("tapable").SyncWaterfallHook<[import("../form/type/field").Value, Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        }>, import("../../useForm").FormStore], import("tapable").UnsetAdditionalOptions>;
        beforeSubmit: import("tapable").SyncWaterfallHook<[false | Values, import("../../useForm").FormStore], import("tapable").UnsetAdditionalOptions>;
        submit: import("tapable").SyncHook<[Values, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
        blur: import("tapable").SyncHook<[Readonly<import("../form/type/field").Filter<{
            name?: string | undefined;
            valuePropName?: string | undefined;
            value?: import("../form/type/field").Value;
            initialValue?: import("../form/type/field").Value;
            type: import("../form/type/field").FieldType;
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
            options?: string[] | import("../form/type/field").AsyncOption | import("../form/type/field").Option[] | undefined;
            __options__?: import("../form/type/field").Option[] | undefined;
            __visible__?: boolean | undefined;
            option?: import("../form/type/field").Option | import("../form/type/field").Option[] | undefined;
            trigger?: "change" | "blur" | undefined;
            validate?: string | undefined;
            validateMsg?: string | undefined;
            rules?: import("rc-field-form/lib/interface").Rule[] | undefined;
            disabled?: boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
            visible?: string | boolean | import("../form/type/field").Where | import("../form/type/field").Where[] | undefined;
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
        }>, import("../../useForm").FormStore], void, import("tapable").UnsetAdditionalOptions>;
    };
};
export default useCrud;
