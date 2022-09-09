import React, {
  createContext,
  Fragment,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import * as Ant from 'antd';
import { travelConf } from './ts/travelConf';
import { Api, runApi } from '../../lib/api';
import { get, omit } from 'lodash';
import { parseExpr } from '../../lib/useParseExpr';
import useUnmount from '../../lib/useUnmount';
import setValues from '../../lib/setValues';
import { BehaviorSubject } from 'rxjs';
import useForm from '../form';
import { filter, takeUntil, tap } from 'rxjs/operators';
import useCrud from '../crud';
import loop from '../../lib/loop';
import { useObservable } from 'rxjs-hooks';
import { internalPluginsFactory } from './plugins';
// pluguns start
import './plugins/transformConf';

export declare type IApp = ICom;

export declare type ICom = {
  type: Exclude<keyof typeof Ant, 'version'> | 'CRUD';
  data: any;
  // 转换data
  transform?: (data: any) => any[];
  children?: ICom[] | ICom | string;
  id?: string;
  props: any;
  template?: ICom & { key?: string };
};

export declare type AppContextValue = {
  com$s: { [x: string]: BehaviorSubject<any> };
  api$s: { [x: string]: BehaviorSubject<any> };
};

export declare type AppProps = {
  app: ICom;
  api?: {
    [x: string]: Api;
  };
  appContextValue?: AppContextValue;
};

export const AppContext = createContext<AppContextValue | undefined>(undefined);

const Com = (props: { conf: ICom } & { children?: ReactNode }) => {
  const { conf, ...rest } = props;
  const { type, id, data, transform, template, props: initialProps, children } = conf;

  let AntCom = get(Ant, type) ?? Fragment;

  const { com$s, api$s } = useContext(AppContext)!;
  const data$ = useMemo(() => (id ? com$s[id] : new BehaviorSubject(data)), []);
  const unmount$ = useUnmount();

  // 强制更新
  const [_, update] = useState(0);

  // 持久化记录最新的props
  const comRef = useRef({
    ...omit(conf, 'children'),
    props: omit(conf.props, 'formConfig'),
  });
  const childrenRef = useRef(children);

  useEffect(() => {
    parseExpr(
      comRef.current,
      { ...com$s, ...api$s },
      (path, result) => {
        // 记录data数据
        if (path === 'data') {
          data$.next(result);
        } else if (path.startsWith('data')) {
          const [, dataPath] = path.split('.');
          data$.next(
            setValues(data$.getValue(), {
              [dataPath]: result,
            }),
          );
        }
        comRef.current = setValues(comRef.current, {
          [path]: result,
        });
        update((val) => val + 1);
      },
      unmount$,
    );

    if (typeof children === 'string' && children.includes('@{')) {
      parseExpr(
        { children },
        { ...com$s, ...api$s },
        (_, result) => {
          childrenRef.current = result as string;
          update((val) => val + 1);
        },
        unmount$,
      );
    }

    return () => {
      id && Reflect.deleteProperty(com$s, id);
    };
  }, []);

  if (type === 'Form') {
    const { form, formStore } = useForm(initialProps);

    useEffect(() => {
      // data数据同步到form组件内部
      data$
        .pipe(
          takeUntil(unmount$),
          tap((data) => {
            data && formStore.setValues(data);
          }),
        )
        .subscribe();

      const { displayAs } = initialProps.formConfig;
      if (displayAs) {
        formStore.setStatus(displayAs);
      }
    }, []);

    formStore.plugins.dispatch.tap('get real time values', (field, formStore) => {
      Promise.resolve().then(() => {
        const values = formStore.getValues();
        data$.next(values);
      });
      return field;
    });
    return form;
  }

  if (type === 'CRUD') {
    const { crud } = useCrud(initialProps.crudConfig);
    return crud;
  }

  if (template) {
    const dataState = useObservable(() =>
      data$.pipe(filter((data) => !(typeof data === 'string' && data.includes('@{')))),
    );
    const list = dataState ? transform?.(dataState) ?? dataState : undefined;
    const { type, props, children } = template;
    console.assert(get(Ant, type) !== undefined, `get(Ant, ${type}) is undefined`);
    const ChildCom = get(Ant, type);
    const vars: { path: string; value: string }[] = [];
    loop(template.props, (path, value) => {
      if (typeof value === 'string' && value.startsWith('$item')) {
        vars.push({ path, value });
      }
    });

    return (
      <AntCom {...rest} {...comRef.current.props}>
        {list?.map((item: any, index: number) => {
          let newProps = props;
          vars.forEach((variable) => {
            const { path, value } = variable;
            newProps = setValues(newProps, {
              [path]: new Function('$item', `return ${value}`)(item),
            });
          });
          const newChildren =
            typeof children === 'string' && children.startsWith('$item')
              ? new Function('$item', `return ${children}`)(item)
              : children;
          return (
            <ChildCom {...newProps} key={newProps.key ?? index}>
              {newChildren}
            </ChildCom>
          );
        })}
      </AntCom>
    );
  }

  return (
    <AntCom {...rest} {...comRef.current.props}>
      {typeof conf.children === 'string'
        ? childrenRef.current
        : Array.isArray(conf.children)
        ? conf.children.map((childConf, index) => {
            return (
              <Com key={childConf.props?.key ?? index} conf={childConf} {...childConf.props} />
            );
          })
        : conf.children && <Com conf={conf.children} />}
    </AntCom>
  );
};

export const useApp = (props: AppProps) => {
  const internalPlugins = internalPluginsFactory();
  const { app, api } = internalPlugins.transformConf.call({
    api: props.api,
    app: props.app,
  });
  const { appContextValue: rootContextValue } = props;
  let contextValue: AppContextValue;

  const com$s = travelConf(app, rootContextValue?.com$s);

  if (rootContextValue) {
    contextValue = rootContextValue;
  } else {
    const api$s = useMemo(() => {
      if (!api) return {};
      return Object.keys(api).reduce((acc, key) => {
        Object.assign(acc, {
          [key]: runApi(api[key]),
        });
        return acc;
      }, {});
    }, []);
    const appContextValue = useRef({ com$s, api$s });
    contextValue = appContextValue.current;
  }

  return rootContextValue ? (
    <Com conf={app} />
  ) : (
    <AppContext.Provider value={contextValue}>
      <Com conf={app} />
    </AppContext.Provider>
  );
};
