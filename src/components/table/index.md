# useTable

```tsx
import React, { useEffect } from 'react';
import { Table, Button, Input } from 'antd';
import useFormTable from '@baiwenbao/hooks/esm/useFormTable';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';
import Mock from 'mockjs';
import { ColumnProps } from 'antd/lib/table';

declare type DataItem = {
  title: string;
  id: number;
  email: string;
  gender: string;
};

const App = () => {
  const handleSearch = () => {
    formStore.submit((err, values) => {
      if (err) return;
      console.log(values);
      submit();
    });
  };

  const formConfig = defineFormConfig({
    layout: 'inline',
    justify: 'end',
    formItems: [
      {
        field: {
          name: 'a',
          type: 'input',
        },
      },
      {
        field: {
          name: 'b',
          type: 'input',
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={handleSearch}>
        搜索
      </Button>,
      <Button onClick={() => reset()}>重置</Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });

  const getTableData = <T extends DataItem>({
    current,
    pageSize,
    ...values
  }: {
    current: number;
    pageSize: number;
  }): Promise<{ total: number; list: T[] }> => {
    console.log(current, pageSize, values);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          Mock.mock({
            total: 100,
            [`list|${pageSize}`]: [
              {
                id: '@guid',
                name: '@cname',
                'gender|1': ['male', 'female'],
                email: '@email',
                disabled: false,
              },
            ],
          }),
        );
      }, 1000);
    });
  };

  const columns: ColumnProps<DataItem>[] = [
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: 'id',
      dataIndex: 'id',
    },
    {
      title: 'gender',
      dataIndex: 'gender',
    },
  ];

  const {
    tableProps,
    refresh,
    search: { submit, reset },
  } = useFormTable<DataItem>(getTableData, {
    formStore,
    paginated: true,
    manual: false,
    defaultParams: [
      {
        pageSize: 10,
        current: 1,
      },
      {
        a: 1,
        b: 2,
      },
    ],
  });

  return (
    <>
      {form}
      <Button type="primary" onClick={() => refresh()} style={{ marginBottom: 8 }}>
        刷新
      </Button>
      <Table
        columns={columns}
        {...tableProps}
        rowKey={(record, index) => String(index)}
        // pagination={{
        //   ...tableProps.pagination,
        //   showTotal: (total) => `共${total}条`,
        // }}
      />
    </>
  );
};

export default App;
```

## table 参数

| 参数 | 说明 | 类型 |
| --- | --- | --- |
| getTableData | 调用接口方法 | (params: {current: number, pageSize: number} & {[name: string]: unknow}) => Promise<{total: number,list: unknow[]}> |
| options | 请求参数 | {formStore: FormStore} |
| manual | 是否手动调用 | boolean |
| defaultParams | 初始化参数 | [{pageSize: number, current: number}, {[name: string]: unknow}] |
