/// <reference types="rc-pagination" />
import React from 'react';
import { FormStore } from '../form/ts/createFormStore';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { TablePaginationConfig } from 'antd';
declare type TParams = [
    Pick<TablePaginationConfig, 'current' | 'pageSize'>,
    Record<string, any> | undefined
];
export declare type GetTableData<TData> = (Params: TParams[0] & TParams[1]) => Promise<{
    total: number;
    list: TData[];
}>;
export declare type RequestOptions<TData> = Options<TData, TParams> & {
    formStore?: FormStore;
    defaultParams?: TParams;
};
declare const useFormTable: <TData>(getTableData: GetTableData<TData>, options: RequestOptions<TData>) => {
    formStore: FormStore | undefined;
    run: (params_0: Pick<TablePaginationConfig, "current" | "pageSize">, params_1: Record<string, any> | undefined) => void;
    mutate: (data?: {
        list: TData[];
        total: number;
    } | ((oldData?: {
        list: TData[];
        total: number;
    } | undefined) => {
        list: TData[];
        total: number;
    } | undefined) | undefined) => void;
    tableProps: {
        dataSource: TData[] | undefined;
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
    refresh: () => void;
    search: {
        submit: (params?: TParams | undefined) => void;
        reset: () => void;
    };
};
export { useFormTable };
export default useFormTable;
