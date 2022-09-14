# useForm

## 配置结构和类型

见 src/components/form/type

## 控件展示

```tsx
import React, { useEffect } from 'react';
import { Button, Tooltip, ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import useForm, { setting, plugins, defineFormConfig } from '@baiwenbao/hooks/esm/useForm';
import moment from 'moment';

const Wrapper = ({ children }) => {
  return <a>{children}</a>;
};

plugins.initFormStore.tap('init form', (formStore) => {
  if (formStore.name === 'base') {
    console.log(formStore.name);
  }
});

const App = () => {
  const formConfig = defineFormConfig({
    name: 'base',
    // layout: 'horizontal',
    labelCol: 4,
    wrapperCol: 20,
    span: 24,
    // gutter: 16,
    justify: 'space-between',
    formItems: [
      {
        label: 'input',
        labelTip: 'label tip',
        field: {
          name: 'a',
          type: 'input',
          tip: {
            title: 'field tip',
            placement: 'right',
          },
        },
        span: 12,
        labelCol: 8,
        wrapperCol: 16,
      },
      {
        label: 'inputnumber',
        field: {
          name: 'num',
          type: 'inputnumber',
          trigger: 'blur',
          validate: 'nrange:1,99',
          validateMsg: 'asd',
        },
        span: 12,
        labelCol: 8,
        wrapperCol: 16,
      },
      {
        label: 'select',
        field: [
          {
            name: 'b',
            type: 'select',
            width: 200,
            options: [
              {
                label: 'a',
                value: 1,
              },
              {
                label: 'b',
                value: 2,
              },
            ],
          },
          {
            name: 'b1',
            width: 200,
            type: 'select',
            options: {
              url: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/options/@{b.value}',
              path: 'data.data.list',
              mapping: ['title', 'taxNo'],
              // values 拼接到异步options前面
              values: [
                {
                  label: '全部',
                  value: 1,
                },
              ],
            },
          },
        ],
        extra: '支持固定配置options、异步options及两者的组合',
      },
      {
        label: 'autocomplete',
        field: {
          name: 'o',
          type: 'autocomplete',
          options: {
            url: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/options/@{o.value}',
            path: 'data.data.list',
            // params: {
            //     value: '@{o.value}'
            // },
            mapping: ['title', 'taxNo'],
            allowEmpty: false,
          },
        },
      },
      {
        label: 'date',
        field: [
          {
            name: 'c',
            type: 'date',
          },
          {
            name: 'd',
            type: 'datetime',
            initialValue: 'now',
          },
          {
            name: 'range',
            type: 'daterange',
            // initialValue: ['2021/1/1', '2021/2/2'],
            // initialValue: [-7, 7], // 当前日期前后七天范围
            format: 'time|YYYY-MM-DD',
          },
          {
            name: 'time',
            type: 'time',
            initialValue: '11:11:11',
          },
        ],
        extra: '支持initialValue: now',
      },
      {
        label: 'radio',
        field: {
          name: 'e',
          type: 'radio',
          initialValue: 1,
          options: [
            {
              label: 'a',
              value: 1,
            },
            {
              label: 'b',
              value: 2,
            },
          ],
        },
        span: 8,
        labelCol: 12,
        wrapperCol: 12,
      },
      {
        label: 'checkbox',
        field: {
          name: 'f',
          type: 'checkbox',
          options: [
            {
              label: 'a',
              value: 1,
            },
            {
              label: 'b',
              value: 2,
            },
          ],
        },
        span: 8,
        labelCol: 12,
        wrapperCol: 12,
      },
      {
        label: 'text',
        field: {
          name: 'g',
          type: 'text',
          initialValue: 'text',
        },
        span: 8,
        labelCol: 12,
        wrapperCol: 12,
      },
      {
        label: 'textarea',
        field: {
          // required: true,
          name: 'h',
          type: 'textarea',
          props: {
            rows: 5,
          },
        },
      },
      {
        label: 'phone',
        field: {
          name: 'code,p',
          type: 'phone',
          initialValue: ['+374', '123121'],
        },
      },
      {
        label: '字符串控件串联',
        inlineLayout: '购买 % \\% 的 %', // 默认以'%'分割, 如需保留% 使用转义符 \\%
        field: [
          {
            name: 'f1',
            type: 'inputnumber',
            width: 100,
            validate: 'length:1,4',
            validateMsg: 'f1长度范围1-4',
          },
          {
            name: 'f3',
            type: 'select',
            options: [
              {
                label: 'a',
                value: 1,
              },
              {
                label: 'b',
                value: 2,
              },
            ],
            width: 100,
          },
        ],
      },
      {
        label: 'JSX控件串联',
        inlineLayout: (
          <>
            %{' '}
            <Button
              type="primary"
              onClick={() => {
                formStore.setValues({ f4: 'f4' });
              }}
            >
              点击
            </Button>
          </>
        ),
        // inlineLayout: <Tooltip title="tip">%</Tooltip>,
        field: {
          name: 'f4',
          width: 200,
        },
        extra: '使用inlineLayout组合 可以自定义事件、显示Tooltip、链接 ',
      },
      {
        label: '控件值拆分',
        field: {
          name: 'start,end',
          type: 'daterange',
          initialValue: ['2020-1-1', '2020-2-3'],
        },
        extra: 'range的值拆分为start、end两个字段',
      },
      {
        label: '控件值组合',
        field: [
          {
            name: 'combine@a',
            type: 'input',
            initialValue: 1,
            width: 100,
          },
          {
            name: 'combine@b',
            type: 'input',
            initialValue: 2,
            width: 100,
          },
        ],
        extra: '组合为combine: {a: 1, b: 2}',
      },
      {
        label: 'Form嵌套',
        field: {
          name: 'nest',
          type: 'nest',
          initialValue: { a: 2, l2: { b: 3, l3: { a: 1, b: 2 } } },
          // multiple: true,
          width: 600,
          labelCol: 2,
          wrapperCol: 22,
          // layout: 'inline',
          formItems: [
            {
              label: '层级一',
              field: {
                name: 'a',
                type: 'input',
                width: 120,
                required: true,
              },
            },
            {
              wrapperCol: 24,
              field: {
                name: 'l2',
                type: 'nest',
                // layout: 'inline',
                labelCol: 2,
                wrapperCol: 22,
                formItems: [
                  {
                    label: '层级二',
                    field: {
                      type: 'input',
                      name: 'b',
                      width: 120,
                    },
                  },
                  {
                    wrapperCol: 24,
                    field: {
                      name: 'l3',
                      type: 'nest',
                      // layout: 'inline',
                      // multiple: true,
                      labelCol: 2,
                      wrapperCol: 22,
                      formItems: [
                        {
                          label: '层级三',
                          field: [
                            {
                              name: 'a',
                              type: 'input',
                              required: true,
                              width: 120,
                            },
                            {
                              name: 'b',
                              type: 'input',
                              width: 120,
                            },
                          ],
                        },
                      ],
                    },
                  },
                ],
              },
            },
          ],
        },
      },
      {
        label: '多行form',
        field: {
          name: 'dynamicForm',
          type: 'nest',
          layout: 'inline',
          multiple: true,
          validate: 'length:-,2',
          validateMsg: '最大长度超出限制',
          // span: 12,
          formItems: [
            {
              // inlineLayout: <div style={{width: 120}}>%</div>,
              field: {
                name: 'a',
                type: 'input',
                width: 120,
                required: true,
              },
            },
            {
              field: {
                name: 'b',
                type: 'select',
                options: ['a', 'b'],
                width: 120,
              },
            },
          ],
        },
      },
      {
        label: '多行form flatten',
        field: {
          name: 'dynamicFlatten',
          type: 'nest',
          multiple: true,
          flatten: true,
          initialValue: ['a'],
          formItems: [
            {
              field: {
                name: 'o',
                width: 200,
                type: 'input',
              },
            },
          ],
        },
      },
      {
        label: 'upload',
        field: {
          name: 'file',
          type: 'upload',
          action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
          initialValue:
            'https://pic1.zhimg.com/v2-751ae4d734d784a2f99bcd5c2f9a3749_1440w.jpg?source=172ae18b',
          props: {
            listType: 'picture-card',
            maxCount: 2,
            // beforeUpload() {
            //   return Promise.reject('1');
            // }
          },
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
      <Button onClick={() => resetFields()}>重置</Button>,
      <Button onClick={() => handlePreview()}>只读</Button>,
      <Button onClick={() => setStatus('edit')}>编辑</Button>,
      <Button onClick={() => handleUpdateSchema()}>update schema</Button>,
    ],
  });

  const { form, formStore, updateSchema } = useForm({ formConfig });
  const { submit, resetFields, setStatus, dispatch, field$s, childFormStoresRefs } = formStore;

  // 修改config 重新渲染form
  const handleUpdateSchema = () => {
    updateSchema({
      layout: 'inline',
      justify: 'start',
      'formItems.0.label': 'newLabel',
    });
  };

  const handlePreview = () => {
    setStatus('preview');
  };

  useEffect(() => {
    setTimeout(() => {
      // console.log(formStore.childFormStoresRefs);
      window.a = () => {
        formStore.childFormStoresRefs[1].current[0].dispatch('a', {
          required: false,
        });
      };
    }, 1000);
  }, []);

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1000);
      });
    });
  };

  return form;
};

export default () => {
  return (
    <ConfigProvider locale={zhCN}>
      <App />
    </ConfigProvider>
  );
};
```

## 布局

### 水平布局

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'horizontal',
    labelCol: 4,
    wrapperCol: 20,
    // width: 250,
    // justify: 'space-between',
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
          type: 'input',
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
      <Button onClick={() => resetFields()}>重置</Button>,
    ],
  });

  const { form, formStore, updateSchema } = useForm({ formConfig });
  const { submit, resetFields, setStatus, $ } = formStore;

  // formStore.plugins.beforeSubmit.tap('check', () => {
  //   console.log('check');
  //   return false;
  // });

  // console.log(formStore.plugins);

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

### 固定宽度布局

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'horizontal',
    labelCol: 4,
    wrapperCol: 20,
    width: 300,
    justify: 'start',
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
          type: 'input',
        },
      },
      {
        label: 'input',
        field: {
          name: 'c',
          type: 'input',
        },
      },
      {
        label: 'input',
        field: {
          name: 'd',
          type: 'input',
        },
      },
      {
        label: 'input',
        field: {
          name: 'e',
          type: 'input',
        },
      },
      {
        label: 'input',
        field: {
          name: 'f',
          type: 'input',
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
      <Button onClick={() => resetFields()}>重置</Button>,
    ],
  });

  const { form, formStore, updateSchema } = useForm({ formConfig });
  const { submit, resetFields, setStatus, $ } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

### 内联布局

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
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
          type: 'input',
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
      <Button onClick={() => resetFields()}>重置</Button>,
    ],
  });

  const { form, formStore, updateSchema } = useForm({ formConfig });
  const { submit, resetFields, setStatus } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## 校验

通过`field.trigger`字段设置触发校验时机, 可设置为`change, blur`

```tsx
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';
import React, { useEffect } from 'react';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'horizontal',
    labelCol: 4,
    wrapperCol: 20,
    formItems: [
      {
        label: 'validate on change',
        field: {
          name: 'v1',
          type: 'input',
          validate: 'match:email',
          placeholder: 'email',
          required: true,
          // listener: {
          //   watch: ['v1'],
          //   condition: 'typeof v1.value !== "undefined"',
          //   set: {
          //     error: '{message: "some error"}',
          //   },
          // },
        },
      },
      {
        label: 'validate on blur',
        field: {
          name: 'v2',
          type: 'input',
          trigger: 'blur',
          validate: 'match:email',
          placeholder: 'email',
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
      <Button onClick={() => resetFields()}>重置</Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });
  const { submit, resetFields, setStatus, $, dispatch } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## 自定义联动

通过`useForm`返回的`formStore`能够定义控件的交互

监听一个控件`formStore.$(NAME)` 监听多个控件`formStore.$([NAME1, ...])`

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'inline',
    // justify: 'end',
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
          name: 'b',
          type: 'text',
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });
  const { submit } = formStore;

  useEffect(() => {
    if (!formStore) return;
    const { setValues, $ } = formStore;
    $('a').subscribe((state) => {
      setValues({
        b: state.value,
      });
    });
  }, [formStore]);

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## 配置联动

### 通过`@{js表达式}`配置联动

js 表达式内变量名以`$`开头 如`$price`, 有循环依赖不要使用这种方式

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
    // layout: 'inline',
    formItems: [
      {
        label: '联动计算',
        field: [
          {
            name: 'price',
            type: 'input',
            placeholder: '单价',
            width: 200,
          },
          {
            name: 'count',
            type: 'input',
            placeholder: '数量',
            width: 200,
          },
          {
            name: 'amount',
            type: 'input',
            placeholder: '总价',
            width: 200,
            value: '@{($price.value * $count.value) || 0}',
          },
        ],
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });
  const { submit } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

### 通过配置 listener 表达联动关系

```ts
// listener
type Listener = {
  watch: string | string[];
  condition?: string; // function body
  set: {
    [x: string]: string; // function body
  };
};
```

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
    // layout: 'inline',
    formItems: [
      {
        label: 'a',
        field: [
          {
            name: 'a',
            type: 'input',
            width: 200,
          },
          {
            type: 'select',
            name: 'e',
            options: {
              url: 'https://www.fastmock.site/mock/2d68a1f1e6e438c5b2e28d6b5cdb73ba/a/options/1',
              path: 'data.data.list',
              mapping: ['title', 'taxNo'],
            },
            width: 300,
            placeholder: '监听控件a，自动调用接口更新options',
            listener: [
              {
                watch: ['a'],
                condition: 'typeof a.value !== "undefined"',
                set: {
                  'options.params': '{value: a.value}',
                },
              },
            ],
          },
        ],
      },
      {
        label: 'listener',
        field: [
          {
            type: 'input',
            name: 'c',
            width: 200,
          },
          {
            type: 'text',
            name: 'd',
            listener: {
              watch: 'c',
              set: {
                value: 'utils.format(Number(c.value) + 1, "thousands")',
              },
            },
          },
        ],
        extra: '监听并对值进行格式化',
      },
      {
        label: '联动计算',
        field: [
          {
            name: 'price',
            type: 'input',
            placeholder: '单价',
            width: 200,
          },
          {
            name: 'count',
            type: 'input',
            placeholder: '数量',
            width: 200,
          },
          {
            name: 'amount',
            type: 'input',
            placeholder: '总价',
            width: 200,
            listener: [
              {
                watch: ['price', 'count'],
                condition: 'price.value > 0 && count.value > 0',
                set: {
                  value: 'price.value * count.value',
                },
              },
            ],
          },
        ],
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });
  const { submit } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## format

对控件 value 进行转换内置支持的转换类型有: 'yuan' | 'fen' | 'time|SCHEMA' | 'percent' | 'thousands' | 'float|LEN'

支持多个 format 规则组合使用，如`{format: ['thousands', 'float|2']}` 执行顺序为自右向左

```tsx
import React, { useEffect } from 'react';
import { Button } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';
import format from '@baiwenbao/hooks/esm/components/form/ts/format';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'horizontal',
    formItems: [
      {
        label: 'format类型',
        field: {
          name: 'formatter',
          type: 'select',
          initialValue: 'yuan',
          options: [
            {
              label: 'yuan',
              value: 'yuan',
            },
            {
              label: 'fen',
              value: 'fen',
            },
            {
              label: 'YYYY-MM-DD',
              value: 'time|YYYY-MM-DD',
            },
            {
              label: 'YYYY-MM-DD HH:mm:ss',
              value: 'time|YYYY-MM-DD HH:mm:ss',
            },
            {
              label: '%',
              value: 'percent',
            },
            {
              label: '千分位',
              value: 'thousands',
            },
            {
              label: '千分位并保留一位小数',
              value: ['thousands', 'float|1'],
            },
            {
              label: '千分位并保留两位小数',
              value: ['thousands', 'float|2'],
            },
            {
              label: '千分位并自增1',
              value: ['thousands', 'Number(value) + 1'],
            },
          ],
          submit: false,
          width: 300,
        },
      },
      {
        label: 'format内容',
        field: {
          type: 'input',
          name: 'content',
          width: 300,
          initialValue: 100,
        },
      },
      {
        label: 'format返回',
        field: {
          type: 'text',
          name: 'text',
          submit: false,
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });
  const { submit } = formStore;

  // 同步控件a的数据到控件b
  useEffect(() => {
    if (!formStore) return;
    const { $, dispatch } = formStore;
    $('formatter').subscribe((state) => {
      dispatch('content', {
        format: state.value,
      });
    });
    $(['formatter', 'content']).subscribe(([formatterState, contentState]) => {
      dispatch('text', {
        value: format(contentState),
      });
    });
  }, [formStore]);

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## 表单分组

```tsx
import React, { useEffect } from 'react';
import { Button, Card, Form } from 'antd';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'horizontal',
    labelCol: 4,
    wrapperCol: 20,
    formItems: [
      {
        label: 'toggle',
        field: {
          name: 'toggle',
          type: 'radio',
          initialValue: 1,
          options: [
            {
              label: 'a',
              value: 1,
            },
            {
              label: 'b',
              value: 2,
            },
          ],
        },
      },
    ],
    groups: [
      {
        title: '分组一',
        visible: '@{toggle.value === 1}',
        component: <Card style={{ marginBottom: 10 }} />,
        formItems: [
          {
            label: 'layout',
            field: {
              name: 'layout',
              type: 'radio',
              options: [
                {
                  label: 'horizontal',
                  value: 'horizontal',
                },
                {
                  label: 'vertical',
                  value: 'vertical',
                },
                {
                  label: 'inline',
                  value: 'inline',
                },
              ],
            },
          },
          {
            label: 'labelCol',
            field: {
              type: 'input',
              name: 'labelCol',
            },
          },
          {
            label: 'wrapperCol',
            field: {
              type: 'input',
              name: 'wrapperCol',
            },
          },
        ],
      },
      {
        title: '分组二',
        component: <Card />,
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
              name: 'b',
              type: 'input',
            },
          },
        ],
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
      <Button onClick={() => resetFields()}>重置</Button>,
    ],
  });

  const { form, formStore } = useForm({ formConfig });
  const { submit, resetFields } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## FormModal

```tsx
import React, { useEffect } from 'react';
import { callFormModal } from '@baiwenbao/hooks/esm/useForm';
import useForm, { defineFormConfig } from '@baiwenbao/hooks/esm/useForm';
import { Button } from 'antd';

const App = () => {
  const formConfig = defineFormConfig({
    layout: 'horizontal',
    labelCol: 4,
    wrapperCol: 20,
    formItems: [
      {
        label: 'a',
        // span: 12,
        field: {
          name: 'a',
          type: 'input',
          required: true,
        },
      },
      {
        label: 'b',
        // span: 12,
        field: {
          disabled: {
            a: '4',
          },
          name: 'b',
          type: 'select',
        },
      },
      {
        label: 'c',
        // span: 12,
        field: {
          name: 'c',
          type: 'nest',
          multiple: true,
          layout: 'inline',
          formItems: [
            {
              field: {
                type: 'input',
                name: 'a',
              },
            },
            {
              field: {
                type: 'inputnumber',
                name: 'b',
                required: '@{a.value !== undefined}',
                // listener: {
                //   watch: ['a'],
                //   set: {
                //     required: 'a.value ? true : undefined',
                //   },
                // },
              },
            },
          ],
        },
      },
    ],
  });

  const handleClick = async () => {
    const { formStore, destory } = await callFormModal({
      formConfig,
      width: 600,
      title: '弹窗标题',
      okText: '下一步',
      submit(values) {
        // 调用提交接口
        console.log(values);
        return Promise.resolve();
      },
    });

    formStore.dispatch('a', {
      // required: false,
      value: 3,
    });
  };

  return (
    <Button type="primary" onClick={handleClick}>
      唤起弹窗
    </Button>
  );
};

export default App;
```

## Plugins

plugins 分为

- 全局 plugins 对所有 form 都生效
- 内部 plugins 挂载在 formStore 上 仅对当前 form 生效

| plugin name     | 描述             | 参数                                |
| --------------- | ---------------- | ----------------------------------- |
| field           | 自定义 field     |                                     |
| loadConfig      | 配置预处理       | 'formConfig'                        |
| initFormStore   | form 初始化      | 'formStore'                         |
| register        | 注册控件时执行   | 'field', 'formStore'                |
| beforeDispatch  | dispatch 中处理  | 'name', 'updateState', 'formStore'  |
| dispatch        | dispatch 中处理  | 'field', 'formStore', 'updateState' |
| fieldMounted    | 控件 mounted     | 'field', 'formStore'                |
| formItemMounted | formItem mounted | 'formItem', 'formStore'             |
| beforeSubmit    | 提交前处理       | 'values', 'formStore'               |
| submit          | 提交后处理       | 'values', 'formStore'               |
| blur            | 控件失去焦点     | 'field', 'formStore'                |

### 注册全局 plugins

全局 plugins 可以通过`formStore.name`进行过滤

```ts
import { plugins } from '@baiwenbao/hooks/esm/useForm';

plugins[PLUGINNAME].tap(NAME, () => {
  return; // ...
});
```

### 注册局部 plugins

```ts
const { formStore } = useForm();

formStore.plugins[PLUGINNAME].tap(NAME, () => {
  return; // ...
});
```

### 自定义控件类型

内置的控件类型有：'input' | 'inputnumber' | 'select' | 'checkbox' | 'radio' | 'text' | 'date' | 'datetime' | 'phone' | 'autocomplete'

也可以通过 plugin 自定义控件

```tsx
import useForm, { plugins, useRegister } from '@baiwenbao/hooks/esm/useForm';
import { FormStore } from '@baiwenbao/hooks/esm/useForm';
import { IField } from '@baiwenbao/hooks/esm/components/form/type/field';
import { Input, Button } from 'antd';
import React from 'react';

const customFieldType = 'customFieldType';

// 自定义控件
// 通过cloneElement添加props
const CustomField = ({ formStore, fieldState }: { formStore: FormStore; fieldState: IField }) => {
  const { state, onChange } = useRegister(fieldState);

  return (
    <>
      这是
      <Input
        value={state.value}
        onChange={(e) => onChange(e.target.value)}
        style={{ width: 'auto' }}
      />
      自定义控件
    </>
  );
};

// 这种支持在blur是同步数据到fieldStore
const CustomField1 = ({ formStore, fieldState, internalValue$, internalValue, blur$, change$ }) => {
  if (fieldState.displayAs === 'preview') {
    return <>这是{fieldState.value}自定义控件</>;
  }

  return (
    <>
      这是
      <Input
        value={internalValue}
        onChange={(e) => {
          internalValue$.next(e.target.value);
          change$.next();
        }}
        onBlur={() => blur$.next()}
        style={{ width: 'auto' }}
      />
      自定义控件
    </>
  );
};

// plugin系统注册自定义控件
plugins.field.tap(customFieldType, () => {
  return <CustomField1 />;
});

const App = () => {
  const formConfig: IForm = {
    layout: 'inline',
    formItems: [
      {
        label: 'custom',
        field: {
          name: 'custom',
          type: customFieldType,
        },
      },
    ],
    buttons: [
      <Button type="primary" onClick={() => handleSubmit()}>
        提交
      </Button>,
    ],
  };
  const { form, formStore } = useForm({ formConfig });
  const { submit, resetFields } = formStore;

  const handleSubmit = () => {
    submit((err, values) => {
      if (err) return;
      console.log(values);
      // 调用提交接口
    });
  };

  return form;
};

export default App;
```

## Form Table (废弃)

```
import useTableForm from '@baiwenbao/hooks/esm/components/form/components/tableForm';
import { Table, Button, Divider } from 'antd';
import uniqueId from 'lodash/uniqueId';
import { plugins } from '@baiwenbao/hooks/esm/useForm';

const App = () => {
  const formConfig: IForm = {
    name: 'tableForm',
    layout: 'table',
    formItems: [
      {
        label: 'a',
        labelTip: 'a tip',
        field: {
          name: 'a',
          type: 'input',
          tip: 'input tip',
        },
      },
      {
        label: 'b',
        field: {
          name: 'b',
          type: 'datetime',
        },
      },
      {
        label: 'c',
        field: {
          name: 'c',
          type: 'textarea',
        },
      },
      {
        label: 'd',
        field: {
          name: 'd',
          type: 'input',
        },
      },
      {
        label: 'amount',
        field: {
          name: 'amount',
          type: 'text',
        },
      },
    ],
  };

  const getData = () => {
    return Promise.resolve({
      list: new Array(30).fill(undefined).map(() => {
        return {
          uid: uniqueId(),
        };
      }),
      total: 30,
    });
  };

  const actions: TableFormProps<{
    a: string;
    b: string;
    c: string;
  }>['actions'] = (record) => {
    return (
      <>
        <a onClick={() => move(record.uid, -1)}>上移</a>
        <Divider type="vertical" />
        <a onClick={() => move(record.uid, 1)}>下移</a>
        <Divider type="vertical" />
        <a onClick={() => remove(record.uid)}>删除</a>
      </>
    );
  };

  const { form, add, remove, submit, mutate, move, tableProps } = useTableForm<{
    a: string;
    b: string;
    c: string;
  }>({
    getData,
    formConfig,
    actions,
    effect(formStore) {
      formStore.plugins.initFormStore.tap('calc', (formStore, field) => {
        const { $, dispatch, field$s, name } = formStore;
        $(['a', 'd']).subscribe((states) => {
          const value = states.reduce((acc, next) => {
            return Number(acc.value) * Number(next.value);
          });
          dispatch('amount', {
            value,
          });
        });
      });
    },
  });

  return (
    <>
      <Button type="primary" onClick={() => add([{ a: 'a' }])} style={{ marginBottom: 8 }}>
        添加
      </Button>
      {form}
      <Button
        type="primary"
        onClick={() =>
          submit((err, values) => {
            if (err.length) return;
            console.log(values);
          })
        }
      >
        提交
      </Button>
    </>
  );
};

// export default App
```

## API

### IForm

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layout | 布局方式 | 'horizontal'、 'vertical'、 'inline' | - |
| labelCol | 同 antd lableCol | number | - |
| wrapperCol | 同 antd wrapperCol | number | - |
| formItems | formItem 结构 | IFormItem[] | - |
| justify | 对其方式 | 'start'、 'end'、 'center'、 'space-around'、 'space-between' | 'start' |
| groups | form 分组展示 | {title: ReactNode, extra?: ReactNode, formItems: IFormItem[], component?: JSX.Element}[] | - |
| buttons | 按钮 | ReactNode[] | - |

### IFormItem

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| label | label | ReactNode | - |
| labelTip | label 描述 | ReactNode 、 ToolTipProps | - |
| field | 控件结构 | IField、 IField[] | - |
| extra | 控件底部文案 | ReactNode | - |
| block | 是否独占一行 | boolean | - |
| visible | 是否可见 | boolean | true |
| inlineLayout | 文本串联, %为控件占位符 如: '购买 % 个价格为 % 的 %' <br/>或 JSX 串联 如: <>% 【JSX.Element】</> <br/> 可通过 setting 重新设置占位符 | ReactNode | - |
| className | className | string | - |

### IField

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 字段名, 如'id'或'startTime,endTime' | string | - |
| valuePropName | 设置值得属性名，默认'value' | string | 'value' |
| value | 控件值 | unknow | - |
| initialValue | 默认值 | unknow、unknow[] | - |
| type | 控件类型 | 'input'、 'inputnumber'、 'select'、 'checkbox'、 'check'、 'radio'、 'text'、 'date'、 'datetime'、 'phone'、 'autocomplete'、 'textarea' | 'input' 、 'inputlist'、'autocompletelist'、'nest' |
| placeholder | placeholder | string | - |
| tip | toolTip | ReactNode 、 ToolTipProps | - |
| required | 是否必填 | boolean | false |
| format | 格式化控件值 | Format | - |
| options | options | AsyncOption 、 Option[] | - |
| rules | 同 antd form Rule | ValidationRule[] | - |
| disabled | 是否禁用 | boolean | false |
| visible | 是否可见，false 不被提交 | boolean | true |
| width | 设置控件宽度 单位'px' | number |  |
| label | Check label | ReactNode | string |
| submit | 是否需要被提交 | boolean | true |
| error | 错误信息 | string | - |
| props | antd field Props | - | - |
| displayAs | 显示为 | 'preview'、'edit' | - |
| link | displayAs 为 preview 以链接形式显示 | {type: 'link'、'a', target?: '\_blank', url: string} | - |
| formItems | 同 Form 上属性 |
| layout | 同 Form 上属性 |
| labelCol | 同 Form 上属性 |
| wrapperCol | 同 Form 上属性 |
| labelAlign | 同 Form 上属性 |
| multiple | 是否多行控件组合 type 为 combo 时生效 | boolean | - |
| flatten | multiple 为 true, 并只有一个控件时配置，扁平化结果 | boolean | - |

### AsyncOption

'select'、'checkbox'、'radio'、'autocomplete'需要配置

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| url | 请求接口 url | string |  |
| method |  | 'get'、'post' | 'get' |
| params | get 请求参数 | object |  |
| data | post 请求参数 | object |  |
| mapping | key, value 映射字段名 | string[] | ['label', 'value'] |
| deps | 依赖字段名 | string[] |  |
| path | options 键值对在接口响应中的路径 | string |  |
| debounceTime | 防抖 time | number | 500 |
| allowEmpty | autoComplete 控件输入内容为空是否发起请求 | boolean | true |
| values | 加到异步 option 之前 如：[{label: '全国', value: 1}] | Option[] | - |

### Option

'select'、'checkbox'、'radio'、'autocomplete'需要配置

| 参数  | 说明 | 类型   | 默认值 |
| ----- | ---- | ------ | ------ |
| label | 文本 | string |        |
| value | 值   | unknow |        |

### FormStore

```ts
declare type FormStore = {
  // form name
  name?: string;
  // 控件数据
  field$s: IField$s;
  // 注册控件
  register: (name: string, _initial: IField) => void;
  // 修改数据
  dispatch: (
    name: string | undefined,
    updateState: Partial<IField> & { [x: string]: any },
    from?: string,
  ) => void;
  // 移除控件
  remove: (names?: string | string[]) => void;
  pick: (names: string | string[]) => IField$[];
  // 选择一个或多个控件
  $: <T extends string | string[]>(
    name: T,
  ) => T extends Array<string> ? Observable<IField[]> : BehaviorSubject<IField>;
  // 校验
  validate: (names?: string | string[], from?: string) => void;
  // 获取错误信息
  getErrors: (names?: string | string[]) => { [name: string]: string } | null;
  // 获取值
  getValues: (names?: string | string[]) => { [name: string]: any };
  // 提交
  submit: (
    submition: (
      errors: { [name: string]: string } | null,
      values: { [name: string]: any },
    ) => void | Promise<unknown>,
  ) => void;
  // 批量设置控件值
  setValues: (values: Values, from?: string) => void;
  // 清除控件值和状态
  resetFields: (_keys?: string[], from?: string) => void;
  // 设置表单状态"disabled" | "preview" | "edit"
  setStatus: (status: IField['displayAs']) => void;
  // 表单局部plugins
  plugins: ReturnType<typeof internalPluginsFactory>;
  childFormStoresRefs?: React.MutableRefObject<FormStore[]>[];
};
```
