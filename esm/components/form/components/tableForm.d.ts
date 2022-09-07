/// <reference types="rc-pagination" />
import React, { ReactNode } from 'react';
import { FormStore } from '../ts/createFormStore';
import { IForm } from '../type/form';
import { GetTableData } from '../../table';
export declare type TableFormProps<T> = {
    formConfig: IForm;
    /**获取接口数据 */
    getData: GetTableData<T & {
        uid: string;
    }>;
    /**操作列按钮 */
    actions?: (record: T & {
        uid: string;
    }, index: number) => ReactNode;
    effect?: (formStore: FormStore, record: any) => void;
    tableProps?: {
        pagination: boolean;
    };
};
declare type ItemData = {
    [x: string]: unknown;
};
declare const useTableForm: <T extends ItemData = ItemData>(props: TableFormProps<T>) => {
    form: JSX.Element;
    add: (items?: Partial<T>[]) => void;
    remove: (uid: string) => void;
    submit: (fn?: ((err: any, values: T[] | undefined) => void) | undefined) => void;
    formStoresRef: React.MutableRefObject<FormStore[]>;
    mutate: (data?: {
        list: (T & {
            uid: string;
        })[];
        total: number;
    } | ((oldData?: {
        list: (T & {
            uid: string;
        })[];
        total: number;
    } | undefined) => {
        list: (T & {
            uid: string;
        })[];
        total: number;
    } | undefined) | undefined) => void;
    move: (uid: string, pos: number) => void;
    tableProps: {
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
            total?: number | undefined;
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
};
export default useTableForm;
