import { FormStore } from '../../ts/createFormStore';
import { IField, Value } from '../../type/field';
import { Subject } from 'rxjs';
import { UploadProps } from 'antd/lib/upload';
export declare type ImgUploadProps<T extends Value | Value[]> = {
    formStore: FormStore;
    fieldState: IField;
    internalValue$: Subject<T>;
    internalValue: T;
    change$: Subject<undefined>;
    blur$: Subject<undefined>;
    onChange: Function;
    /** 单位MB */
    maxSize?: number;
    /** 获取接口返回url */
    getResUrl?: Function;
} & UploadProps;
