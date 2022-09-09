import React, {
  CSSProperties,
  MutableRefObject,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Button, message } from 'antd';
import { ButtonProps } from 'antd/lib/button';
import Modal, { ModalProps } from 'antd/lib/modal';
import callFormModal from '../form/ts/formModal';
import { IForm } from '../form/type/form';
import { Values } from '../form/type/field';
import { get, set, omit } from 'lodash';
import { setting } from '../form/ts/option';
import { AppContext, IApp, useApp } from '../app';
import { callModal } from '../../lib/callModal';
import { parseExpr } from '../../lib/useParseExpr';
import useUnmount from '../../lib/useUnmount';
import setValues from '../../lib/setValues';
import { FormStore } from '../form/ts/createFormStore';
import { Filter } from '../form/type/field';

const Link = setting.Link;

export type Api =
  | string
  | {
      url: string;
      method?: 'post' | 'get' | 'put' | 'delete';
      headers?: any;
      data?: object | ((values: object) => object);
      params?: object | ((values: object) => object);
      path?: string;
      successText?: string;
      successCallback?: Function;
      errorText?: string;
    };

type ActionType = 'url' | 'link' | 'api' | 'modal' | 'cancel' | 'reset' | 'submit';

export type ActionProps<T extends ActionType = ActionType> = Filter<{
  name?: string;
  location?: string;
  label: string;
  // 默认button
  type?: ButtonProps['type'];
  actionType: T;
  url: T extends 'url' ? string : never;
  target: T extends 'url' | 'link' ? '_blank' : never;
  link: T extends 'link' ? string : never;
  api: T extends 'api' | 'submit' ? Api : never;
  modal: T extends 'modal'
    ? {
        title: string;
        width: ModalProps['width'];
        body:
          | {
              type?: 'form';
              formConfig: IForm;
              values?: Values;
              // 获取表单数据接口
              initialApi?: Api;
            }
          | IApp;
        // 提交接口
        action: ActionProps<'api'>;
        actions?: Array<
          | ActionProps<'url'>
          | ActionProps<'link'>
          | ActionProps<'api'>
          | ActionProps<'modal'>
          | ActionProps<'cancel'>
          | ActionProps<'reset'>
          | ActionProps<'submit'>
        >;
      } & Omit<ModalProps, 'content'>
    : never;
  confirmText?: string;
  reset?: T extends 'reset' ? Function : never;
  submit?: T extends 'submit' ? Function : never;
  size?: 'small' | 'large';
  // 按钮是否显示 js逻辑
  visible?: string;
  style?: CSSProperties;
  // 当前Action的外部环境
  context?: {
    formStore?: FormStore; // 在form内
    cancle?: Function; // 在modal内
  };
}>;

export type AllActionProps =
  | ActionProps<'url'>
  | ActionProps<'link'>
  | ActionProps<'api'>
  | ActionProps<'modal'>
  | ActionProps<'cancel'>
  | ActionProps<'reset'>
  | ActionProps<'submit'>;

export const runApiAction = async (
  api: Api,
  values?: Values,
  confirmText?: string,
  disabledRef?: MutableRefObject<boolean>,
) => {
  const isOk = confirmText
    ? await new Promise((resolve) => {
        Modal.confirm({
          title: confirmText,
          okText: '确定',
          cancelText: '取消',
          onOk() {
            resolve(true);
          },
          onCancel() {
            resolve(false);
          },
        });
      })
    : true;

  if (!isOk) return;

  if (disabledRef?.current) return;
  disabledRef && (disabledRef.current = true);

  let res: Promise<unknown>;
  if (typeof api === 'string') {
    res = setting.request.get(api, {
      params: values,
    });
  } else {
    api.method = api.method ?? 'get';

    const finalParams =
      typeof api.params === 'function' ? api.params(values!) : { ...values, ...api.params };
    const finalData =
      typeof api.data === 'function' ? api.data(values!) : { ...values, ...api.data };

    res = setting
      .request({
        ...api,
        params: api.method === 'get' ? finalParams : api.params,
        data: ['post', 'put'].includes(api.method) ? finalData : api.data,
      })
      .then((response) => {
        const { path } = api;
        return path ? get(response, path) : response;
      });
  }

  const successText = typeof api === 'object' ? api.successText : undefined;
  const errorText = typeof api === 'object' ? api.errorText : undefined;
  const successCallback = typeof api === 'object' ? api.successCallback : undefined;

  return res
    .then(
      (data: any) => {
        let isSuccess = false;
        if (!!setting.isSuccess) {
          isSuccess = setting.isSuccess(data);
        } else {
          isSuccess = data.status === 0 || data.code === 200;
        }

        if (isSuccess) {
          successText && message.success(successText);
          successCallback?.(data);
        } else {
          errorText && message.error(errorText);
        }
        return data;
      },
      (err) => {
        errorText && message.error(errorText);
        return Promise.reject(err);
      },
    )
    .finally(() => {
      disabledRef && (disabledRef.current = false);
    });
};

export const Action = (props: AllActionProps) => {
  const disabledRef = useRef<boolean>(false);
  const appContextValue = useContext(AppContext)!;
  const [loading, setLoading] = useState(false);

  const unmount$ = useUnmount();
  const [_, forceUpdate] = useReducer((count) => count + 1, 0);
  const propsRef = useRef(props);

  const { label, type, actionType, confirmText, reset, submit, visible, context, ...rest } =
    propsRef.current;

  useEffect(() => {
    appContextValue &&
      parseExpr(
        omit(props, 'context'),
        { ...appContextValue.com$s, ...appContextValue.api$s },
        (path, result) => {
          propsRef.current = setValues(propsRef.current, {
            [path]: result,
          });
          forceUpdate();
        },
        unmount$,
      );
  }, []);

  if (typeof visible === 'string') {
    const visibleFn = new Function(`return ${visible}`);
    if (visibleFn() === false) return null;
  }

  if (props.actionType === 'link') {
    const { target, link } = props;
    return (
      <Button type={type} {...rest}>
        <Link to={link} target={target}>
          {label}
        </Link>
      </Button>
    );
  }

  if (props.actionType === 'url') {
    const { target, url } = props;
    return (
      <Button type={type} {...rest}>
        <a target={target} href={url}>
          {label}
        </a>
      </Button>
    );
  }

  if (props.actionType === 'api') {
    const { api, confirmText } = props;
    return (
      <Button
        type={type}
        onClick={async () => {
          try {
            setLoading(true);
            await runApiAction(api, undefined, confirmText, disabledRef);
          } finally {
            setLoading(false);
          }
        }}
        loading={loading}
        {...omit(rest, 'successText', 'errorText')}
      >
        {label}
      </Button>
    );
  }

  if (props.actionType === 'modal') {
    const { modal } = props;
    const {
      title,
      body: { type: bodyType },
      action,
      actions,
      ...modalProps
    } = modal;
    if (bodyType === 'form') {
      const { formConfig, values, initialApi } = modal.body as Exclude<
        ActionProps<'modal'>['modal']['body'],
        IApp
      >;

      return (
        <Button
          type={type}
          onClick={async () => {
            if (bodyType === 'form') {
              // const { api, label = '确定' } = action;

              if (initialApi && typeof initialApi === 'object') {
                runApiAction(
                  {
                    ...initialApi,
                    successCallback(data: Values) {
                      formStore.setValues(data);
                    },
                  },
                  undefined,
                  undefined,
                );
              }

              const { formStore } = await callFormModal({
                title,
                formConfig,
                // okText: label,
                values,
                ...modalProps,
                // submit(values) {
                //   return runApiAction(api, values, confirmText, disabledRef);
                // },
              });
            }
          }}
          {...rest}
        >
          {label}
        </Button>
      );
    } else {
      const Content = () => {
        const content = useApp({ app: modal.body as IApp, appContextValue });
        return content;
      };

      return (
        <Button
          type={type}
          onClick={async () => {
            const buttons = actions?.map((actionProps, index) => {
              if (actionProps.actionType === 'api') {
                set(actionProps, 'api.successCallback', () => {
                  destory();
                });
              }
              return <Action key={index} context={{ cancle: () => destory() }} {...actionProps} />;
            });

            const { destory } = await callModal({
              title,
              content: <Content />,
              buttons,
              appContextValue,
              ...modalProps,
            });
          }}
          {...rest}
        >
          {label}
        </Button>
      );
    }
  }

  if (props.actionType === 'reset') {
    const { reset } = props;
    const fn = context?.formStore?.resetFields ?? reset;
    return (
      <Button type={type} onClick={() => fn?.()} {...rest}>
        {label ?? '重置'}
      </Button>
    );
  }

  if (props.actionType === 'submit') {
    const { submit, api, confirmText } = props;

    useEffect(() => {
      context?.formStore?.submitEvent$.subscribe(() => {
        fn?.();
      });
    }, []);

    const fn = context?.formStore
      ? () =>
          context.formStore?.submit(async (err, values) => {
            if (err || !api) return;
            setLoading(true);
            try {
              await runApiAction(api, values, confirmText);
            } finally {
              setLoading(false);
            }
            context.cancle?.();
          })
      : submit;
    return (
      <Button type={type} loading={loading} onClick={() => fn?.()} {...rest}>
        {label ?? '搜索'}
      </Button>
    );
  }

  if (props.actionType === 'cancel') {
    const { reset } = props;
    return (
      <Button type={type} onClick={context ? () => context.cancle?.() : undefined} {...rest}>
        {label ?? '取消'}
      </Button>
    );
  }

  return (
    <Button type={type} {...rest}>
      {label}
    </Button>
  );
};
