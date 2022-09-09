import { ReactNode } from 'react';
import { Rule } from 'antd/lib/form';
import { BehaviorSubject } from 'rxjs';
import { InputProps } from 'antd/lib/input';
import { LabeledValue, SelectProps } from 'antd/lib/select';
import { CheckboxProps } from 'antd/lib/checkbox';
import { RadioProps } from 'antd/lib/radio';
import { TextAreaProps } from 'antd/lib/input/TextArea';
import { Formatter } from '../../../lib/format';
import { TimePickerProps } from 'antd/lib/time-picker';
import { TooltipProps } from 'antd/lib/tooltip';
import { IForm } from './form';
import { DatePickerProps, UploadProps } from 'antd';
import { TreeSelectProps } from 'rc-tree-select';

// 过滤属性类型为null
type NeverableKeys<T> = {
  [K in keyof T]: T[K] extends never ? never : K;
}[keyof T];
export type Filter<T> = Pick<T, Exclude<NeverableKeys<T>, undefined>>;

export type Value = Readonly<unknown> | undefined | null;
export type Values = {
  [name: string]: Value;
};

export type Option = {
  label: string | ReactNode;
  value: string | number;
} & {
  [x: string]: unknown;
};

type Listener = {
  watch: string | string[];
  condition?: string;
  set: {
    [x: string]: unknown;
  };
};

export type AsyncOption = {
  url?: string;
  /**默认get */
  method?: 'get' | 'post';
  /**get请求参数 */
  params?: Values;
  /**post请求参数 */
  data?: Values;
  headers?: { [x: string]: string };
  /**key, value映射字段名 */
  mapping: string[] | ((record: Partial<Option>) => [Option[keyof Option], Option[keyof Option]]); // 键值字段名, 默认 ['label', 'value']
  deps?: string[]; // 联动修改option
  path?: string; // options 键值对在接口响应中的路径
  debounceTime?: number; // 防抖time 默认500毫秒
  allowEmpty?: boolean; // autoComplete控件输入内容为空是否发起请求
  values?: Option[];
};

export type Format = keyof typeof Formatter;

export type FieldType =
  | 'input'
  | 'password'
  | 'inputnumber'
  | 'inputlist'
  | 'autocompletelist'
  | 'select'
  | 'checkbox'
  | 'check'
  | 'radio'
  | 'text'
  | 'date'
  | 'datetime'
  | 'time'
  | 'daterange'
  | 'phone'
  | 'autocomplete'
  | 'textarea'
  | 'nest'
  | 'treeselect'
  | 'upload'
  | 'custom';

// 条件
// 条件比较方式
export type WhereType = 'eq' | 'uneq' | 'gt' | 'lt';
// 条件比较内容
export type WhereContent = {
  [fieldName: string]: Value | Value[];
};

export type Where =
  | WhereContent
  | {
      [fieldName: string]: {
        type: WhereType;
        content: Value | Value[];
      };
    };

export type OptionableTypes = 'select' | 'checkbox' | 'radio' | 'autocomplete';

export type IField<T extends FieldType = FieldType> = Readonly<
  Filter<{
    /**字段名 'a'或['a', 'b'](字段名结构) */
    name?: string;
    /**设置值得属性名，默认'value' */
    valuePropName?: string;
    value?: Value;
    initialValue?: Value;
    type: T;
    tip?: ReactNode | TooltipProps;
    displayAs?: 'preview' | 'edit' | 'disabled';
    link?: {
      type: 'link' | 'a';
      target?: '_blank';
      url: string;
    };
    // custom?: JSX.Element
    placeholder?: string;
    required?: boolean | string;
    requiredMsg?: string;
    /**处理输出 */
    format?: Format | Format[] | string;
    options?: T extends OptionableTypes ? AsyncOption | Option[] | string[] : never;
    /**自动生成 */
    __options__?: T extends OptionableTypes ? Option[] : never;
    /**自动生成 */
    __visible__?: boolean;
    /**非配置 */
    option?: T extends OptionableTypes ? Option | Option[] : never;
    trigger?: 'change' | 'blur';
    /**多个校验以###分割 */
    validate?: string;
    validateMsg?: string;
    rules?: Rule[];
    disabled?: Where | Where[] | boolean;
    /**是否可见，false 不被提交 */
    visible?: Where | Where[] | boolean | string; // 显示条件
    /**设置控件宽度 单位'px' */
    width?: number | string;
    /**Check label */
    label?: ReactNode;
    /**是否需要被提交, 默认true */
    submit?: boolean;
    custom?: T extends 'custom' ? JSX.Element : never;
    /**联动 */
    listener?: Listener | Listener[];
    /**错误信息 */
    error?: { message: string; index?: number };
    /**数据变更来源 */
    __from__?: string;
    multiple?: T extends 'nest' ? boolean : never;
    flatten?: T extends 'nest' ? boolean : never;
    /** 单位MB */
    maxSize?: T extends 'upload' ? number : never;
    /**获取上传url */
    getResUrl?: T extends 'upload' ? (res: any) => string : never;
    /** enter按键触发表单提交 */
    submitOnEnter?: boolean;
    props?: T extends 'input'
      ? InputProps
      : T extends 'select'
      ? SelectProps<LabeledValue>
      : T extends 'checkbox'
      ? CheckboxProps
      : T extends 'radio'
      ? RadioProps
      : T extends 'date' | 'datetime'
      ? DatePickerProps
      : T extends 'time'
      ? TimePickerProps
      : T extends 'treeselect'
      ? TreeSelectProps
      : T extends 'upload'
      ? UploadProps & {
          /** 单位MB */
          maxSize?: number;
          /**@returns url */
          getResUrl?: (res: any) => string;
        }
      : T extends 'textarea'
      ? TextAreaProps
      : never;
  }> &
    Partial<
      Pick<IForm, 'formItems' | 'layout' | 'labelCol' | 'labelAlign' | 'wrapperCol' | 'span'>
    > & {
      [x: string]: unknown;
    }
>;

export declare type IField$ = BehaviorSubject<IField>;

export declare type IField$s = Record<string, BehaviorSubject<IField>>;
