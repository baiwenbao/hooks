# useCrud

```tsx
import React, { useEffect } from 'react';
import useCrud from '@baiwenbao/hooks/esm/components/crud';
import plugins from '@baiwenbao/hooks/esm/components/form/ts/hooks';
import { setting } from '@baiwenbao/hooks/esm/components/form/ts/option';
import axios from 'axios';

plugins.initFormStore.tap('crud init', (formStore) => {
  if (formStore.name === 'add') {
    formStore.dispatch('a', {
      required: true,
    });
  }
});

// 可设置自定义请求方法
setting.request = axios;

const App = () => {
  const config = {
    searchApi: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/list',
    listPath: 'data.data',
    totalPath: 'data.total',
    rowKey: 'id',
    defaultPageSize: 20,
    actions: [
      {
        name: 'add',
        actionType: 'modal',
        modal: {
          title: '新增',
          action: {
            api: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/user/add',
          },
        },
      },
      {
        location: 'header',
        label: 'url',
        actionType: 'url',
        url: '/posts/form',
      },
      {
        name: 'search',
        actionType: 'submit',
      },
      {
        actionType: 'reset',
        location: 'search',
      },
      {
        location: 'list',
        name: 'edit',
        actionType: 'modal',
        label: '编辑',
        modal: {
          title: '编辑',
          action: {
            api: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/user/${id}',
          },
        },
      },
      {
        actionType: 'api',
        label: '启用',
        location: 'list',
        type: 'primary',
        api: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/user/${id}',
        visible: '${b} === 1',
        // successCallback: ''
      },
      {
        actionType: 'api',
        label: '禁用',
        location: 'list',
        type: 'primary',
        api: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/user/${id}',
        visible: '${b} === 2',
      },
      {
        name: 'delete',
        actionType: 'api',
        label: '删除',
        api: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/user/${id}',
        type: 'danger',
        location: 'list',
        confirmText: '确定删除吗',
        successText: '删除成功',
        errorText: '删除失败',
      },
    ],
    columns: [
      {
        label: 'id',
        field: {
          type: '$location === "edit" ? "text" : "input"',
          name: 'id',
          link: {
            type: 'a',
            target: 'blank',
            url: '/posts/form/${id}',
          },
        },
        location: ['edit', 'search', 'list'],
      },
      {
        label: 'a',
        field: {
          type: 'input',
          name: 'a',
        },
      },
      {
        label: 'b',
        field: {
          type: 'select',
          name: 'b',
          options: [
            {
              label: '是',
              value: 1,
            },
            {
              label: '否',
              value: 2,
            },
          ],
          width: '$location === "search" ? 120 : undefined',
        },
      },
    ],
  };

  const { crud, listColumns, tableProps, plugins } = useCrud(config);

  useEffect(() => {
    // plugins.tableColumns.tap('set columns', (columns) => {
    //     columns[columns.length - 1].fixed = 'right';
    //     return columns;
    // });
  }, []);

  return crud;
};

export default () => <App />;
```

## 配置说明

```ts
declare type CrudProps = {
  // 获取列表数据接口
  searchApi: Api;
  listPath: string;
  totalPath: number;
  // 是否手动获取数据， 默认true
  manual?: boolean;
  rowKey: string;
  // 字段配置
  columns: Column[];
  // 按钮定义 header: 列表头  search: 搜索栏  list: 列表操作栏
  actions: (ActionProps & { location: 'header' | 'search' | 'list' })[];
};

declare type Column = {
  label: string;
  field: IField;
  // 显示场景 默认
  location?: ShowScence | ShowScence[];
};

declare type Api =
  | string
  | {
      url: string;
      method?: 'post' | 'get';
      headers?: any;
      data?: any;
      params?: any;
      path?: string;
    };

declare type ActionProps<T = 'url' | 'link' | 'api' | 'modal' | 'cancel' | 'reset' | 'submit'> = {
  name?: string;
  location?: string;
  label: string;
  // 'default' 'primary' 'danger'
  type: ButtonProps['type'];
  actionType: T;
  url: T extends 'url' ? string : never;
  target: T extends 'url' | 'link' ? '_blank' : never;
  link: T extends 'link' ? string : never;
  api: T extends 'api' ? Api : never;
  modal: T extends 'modal'
    ? {
        title: string;
        width: ModalProps['width'];
        body: {
          type?: 'form';
          formConfig: IForm;
          values?: Values;
        };
        action: ActionProps<'api'>;
      }
    : never;
  successText?: T extends 'api' ? string : never;
  successCallback?: Function;
  errorText?: T extends 'api' ? string : never;
  confirmText?: string;
  reset?: T extends 'reset' ? Function : never;
  submit?: T extends 'submit' ? Function : never;
  size?: 'small' | 'large';
};
```
