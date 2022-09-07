/// <reference types="react" />
import { IField, Value } from '../type/field';
declare const useRegister: (field: IField) => {
    state: Readonly<import("../type/field").Filter<{
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
    }> & Partial<Pick<import("../type/form").IForm, "formItems" | "layout" | "labelCol" | "labelAlign" | "wrapperCol" | "span">> & {
        [x: string]: unknown;
    }>;
    onChange: (value: Readonly<Value>) => void;
};
export default useRegister;
