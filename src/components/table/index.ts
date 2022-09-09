import React, { useEffect, useState } from 'react';
import { FormStore } from '../form/ts/createFormStore';
import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { TablePaginationConfig } from 'antd';

type TParams = [
  Pick<TablePaginationConfig, 'current' | 'pageSize'>,
  Record<string, any> | undefined,
];

export type GetTableData<TData> = (Params: TParams[0] & TParams[1]) => Promise<{
  total: number;
  list: TData[];
}>;

const defaultPageSize = 10;

export type RequestOptions<TData> = Options<TData, TParams> & {
  formStore?: FormStore;
  defaultParams?: TParams;
};

const useFormTable = <TData>(getTableData: GetTableData<TData>, options: RequestOptions<TData>) => {
  const { formStore, defaultParams, refreshDeps } = options;

  const [paginationConfig, setPaginationConfig] = useState<TablePaginationConfig>({
    defaultPageSize,
    current: 1,
    pageSize: defaultPageSize,
    onChange: (current: number, pageSize: number) => {
      setPaginationConfig({
        ...paginationConfig,
        current,
        pageSize,
      });
      run({ current, pageSize }, formStore?.getValues());
    },
  });

  const { run, refresh, mutate, params, data, loading, error } = useRequest<
    { list: TData[]; total: number },
    TParams
  >(
    (params, values) => {
      return getTableData({
        current: params.current,
        pageSize: params.pageSize,
        ...values,
      });
    },
    {
      manual: true,
      refreshDeps,
    },
  );

  const submit = (params?: TParams) => {
    const formValues = params?.[1];
    const current = params?.[0].current ?? 1;

    setPaginationConfig((paginationConfig) => ({
      ...paginationConfig,
      current,
    }));

    if (formValues) {
      run(...params);
      return;
    }
    const values = formStore?.getValues();
    run(
      {
        current,
        pageSize: paginationConfig.pageSize,
      },
      values,
    );
  };

  const reset = () => {
    formStore?.resetFields();
    const values = formStore?.getValues();
    setPaginationConfig((paginationConfig) => ({
      ...paginationConfig,
      current: 1,
    }));
    run({ current: 1, pageSize: paginationConfig.pageSize }, values);
  };

  useEffect(() => {
    defaultParams?.[1] && formStore?.setValues(defaultParams?.[1]);
    submit(defaultParams);
  }, []);

  return {
    formStore,
    run,
    mutate,
    tableProps: {
      dataSource: data?.list,
      loading,
      error,
      pagination: {
        total: data?.total,
        ...paginationConfig,
        showQuickJumper: true,
        showSizeChanger: true,
      },
    },
    refresh,
    search: {
      submit,
      reset,
    },
  };
};

export { useFormTable };

export default useFormTable;
