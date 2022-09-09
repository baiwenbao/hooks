# useApp

## 功能

- 显示数据
- 收集、提交数据
- 数据关联

## demo

```tsx
import React, { useEffect } from 'react';
import { Table, Button, Input, Layout, Menu } from 'antd';
import { useApp } from '@baiwenbao/hooks/esm/components/app';
import { setting } from '@baiwenbao/hooks/esm/components/form/ts/option';
import axios from 'axios';

// 可设置自定义请求方法
setting.request = axios;

const App = () => {
  const appConfig = {
    api: {
      baseInfo: {
        url: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/menus?a=@{$query.a}',
        path: 'data.data',
      },
    },
    app: {
      type: 'Layout',
      children: [
        {
          type: 'Layout.Header',
          props: {
            style: { marginBottom: 10 },
          },
          children: [
            {
              type: 'Menu',
              props: {
                mode: 'horizontal',
                theme: 'dark',
                defaultSelectedKeys: ['1'],
                style: { lineHeight: '64px' },
              },
              children: [
                {
                  type: 'Menu.Item',
                  children: 'xx1',
                  props: {
                    key: '1',
                  },
                },
                {
                  type: 'Menu.Item',
                  children: 'xx2',
                  props: {
                    key: '2',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Layout',
          children: [
            {
              type: 'Layout.Sider',
              props: {
                style: { background: '#fff', marginRight: 10 },
              },
              children: [
                {
                  type: 'Menu',
                  props: {
                    defaultSelectedKeys: ['1'],
                    mode: 'inline',
                  },
                  children: [
                    {
                      type: 'Menu.Item',
                      children: 'side1',
                      props: {
                        key: '1',
                      },
                    },
                    {
                      type: 'Menu.Item',
                      children: 'side2',
                      props: {
                        key: '2',
                      },
                    },
                    {
                      type: 'Menu.SubMenu',
                      props: {
                        title: 'side3',
                        key: '3',
                        mode: 'inline',
                      },
                      children: [
                        {
                          type: 'Menu.Item',
                          children: 'sub1',
                          props: {
                            key: 'sub1',
                          },
                        },
                        {
                          type: 'Menu.Item',
                          children: 'sub2',
                          props: {
                            key: 'sub2',
                          },
                        },
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'Layout.Content',
              children: [
                {
                  type: 'PageHeader',
                  props: {
                    title: '@{baseInfo.title}',
                    subTitle: '@{baseInfo.subTitle}',
                    style: { marginBottom: 10 },
                  },
                },
                {
                  type: 'Card',
                  props: {
                    title: 'Form card',
                    style: { marginBottom: 10 },
                  },
                  children: [
                    {
                      type: 'Form',
                      id: 'form1',
                      data: '@{baseInfo.formData}',
                      props: {
                        formConfig: {
                          layout: 'inline',
                          formItems: [
                            {
                              label: 'input',
                              field: {
                                name: 'a',
                                type: 'input',
                              },
                            },
                            {
                              label: 'select',
                              field: {
                                name: 'b',
                                type: 'select',
                                options: ['1', '2'],
                                width: 100,
                                required: true,
                              },
                            },
                          ],
                          actions: [
                            {
                              label: '查询',
                              type: 'primary',
                              actionType: 'submit',
                              api: {
                                url: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/menus',
                                successText: '查询成功',
                              },
                            },
                            {
                              label: 'Modal',
                              actionType: 'modal',
                              modal: {
                                title: '@{baseInfo.modal.title}',
                                width: 600,
                                body: {
                                  children: [
                                    {
                                      type: 'Card',
                                      props: {
                                        title: 'a form',
                                      },
                                      children: [
                                        {
                                          type: 'Form',
                                          id: 'modalForm',
                                          data: {
                                            a: '@{baseInfo.modal.a}',
                                            b: '@{baseInfo.modal.b}',
                                          },
                                          props: {
                                            formConfig: {
                                              formItems: [
                                                {
                                                  label: 'a',
                                                  field: {
                                                    name: 'a',
                                                    type: 'input',
                                                  },
                                                },
                                                {
                                                  label: 'b',
                                                  field: {
                                                    type: 'text',
                                                    name: 'b',
                                                  },
                                                },
                                              ],
                                            },
                                          },
                                        },
                                        {
                                          children: '表单值 a: @{modalForm.a}, b: @{modalForm.b}',
                                        },
                                      ],
                                    },
                                    {
                                      type: 'Card',
                                      props: {
                                        title: 'b form',
                                        style: {
                                          marginTop: 10,
                                        },
                                      },
                                      children: [
                                        {
                                          id: 'modalForm1',
                                          type: 'Form',
                                          data: {
                                            c: '@{baseInfo.modal.c}',
                                          },
                                          props: {
                                            formConfig: {
                                              formItems: [
                                                {
                                                  label: 'c',
                                                  field: {
                                                    name: 'c',
                                                    type: 'input',
                                                  },
                                                },
                                              ],
                                            },
                                          },
                                        },
                                      ],
                                    },
                                  ],
                                },
                                actions: [
                                  {
                                    label: '取消',
                                    actionType: 'cancel',
                                  },
                                  {
                                    label: '提交',
                                    type: 'primary',
                                    actionType: 'api',
                                    api: {
                                      url: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/menus',
                                      successText: '提交成功',
                                      params: {
                                        a: '@{modalForm}',
                                        c: '@{modalForm1.c}',
                                      },
                                    },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    },
                    {
                      type: 'Typography.Text',
                      children: '动态表单值：@{form1.a}, @{form1.b}',
                      props: {
                        // code: true
                      },
                    },
                  ],
                },
                {
                  type: 'Card',
                  props: {
                    title: 'Descriptions card',
                    style: { marginBottom: 10 },
                  },
                  children: [
                    {
                      type: 'Descriptions',
                      props: {
                        title: 'form values',
                        bordered: true,
                      },
                      data: '@{form1}',
                      transform(data) {
                        const keys = Object.keys(data);
                        return keys.map((key) => {
                          return {
                            label: key,
                            value: data[key],
                          };
                        });
                      },
                      template: {
                        type: 'Descriptions.Item',
                        props: {
                          label: '$item.label',
                        },
                        children: '$item.value',
                      },
                    },
                  ],
                },
                {
                  type: 'Card',
                  props: {
                    title: 'List card',
                  },
                  children: {
                    type: 'CRUD',
                    props: {
                      crudConfig: {
                        initialApi:
                          'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/list',
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
                      },
                    },
                  },
                },
                {
                  type: 'Card',
                  props: {
                    style: { marginTop: 10 },
                  },
                  children: {
                    type: 'Tabs',
                    props: {
                      defaultActiveKey: '@{$query.tab}',
                      // activeKey: '@{form1.b}'
                    },
                    children: [
                      {
                        type: 'Tabs.TabPane',
                        props: {
                          tab: 'tab 1',
                          key: '1',
                        },
                        children: [
                          {
                            type: 'Form',
                            props: {
                              formConfig: {
                                // displayAs: 'preview',
                                // layout: 'inline',
                                labelCol: 2,
                                wrapperCol: 22,
                                formItems: [
                                  {
                                    label: 'a',
                                    field: [
                                      {
                                        name: 'a',
                                        type: 'input',
                                        initialValue: 'aaa',
                                        width: 200,
                                      },
                                      {
                                        name: 'text',
                                        submit: false,
                                        type: 'text',
                                        value: '@{a.value}',
                                      },
                                    ],
                                  },
                                  {
                                    label: 'b',
                                    field: {
                                      type: 'select',
                                      name: 'b',
                                      width: 200,
                                    },
                                  },
                                ],
                                actions: [
                                  {
                                    label: '搜索',
                                    actionType: 'submit',
                                    type: 'primary',
                                  },
                                  {
                                    label: '重置',
                                    actionType: 'reset',
                                  },
                                ],
                              },
                            },
                          },
                        ],
                      },
                      {
                        type: 'Tabs.TabPane',
                        props: {
                          tab: 'tab 2',
                          key: '2',
                        },
                        children: [
                          {
                            type: 'Form',
                            id: 'input',
                            data: {
                              a: 'aaa',
                            },
                            props: {
                              formConfig: {
                                layout: 'inline',
                                formItems: [
                                  {
                                    field: {
                                      type: 'input',
                                      name: 'a',
                                    },
                                  },
                                ],
                              },
                            },
                          },
                          {
                            type: 'Typography.Text',
                            children: '@{$input ? $input.a : undefined}',
                          },
                        ],
                      },
                    ],
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Layout.Footer',
          children: '@{baseInfo.footer}',
          props: {
            style: {
              textAlign: 'center',
            },
          },
        },
      ],
    },
  };

  return useApp(appConfig);
};

export default () => <App />;
```
