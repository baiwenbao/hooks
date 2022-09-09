import { IField } from '../components/form/type/field';
import { useEffect, useContext } from 'react';
import { FormContext } from '../components/form/ts/createFormStore';
import { map, takeUntil, tap } from 'rxjs/operators';
import useUnmount from './useUnmount';
import loop from './loop';
import { template, get } from 'lodash';
import { combineLatest, Observable, Subject } from 'rxjs';

const findVariableNames = (str: string): string[] => {
  const names: string[] = [];
  let temp = '';
  for (let i = 0; i < str.length; i++) {
    const isValidChar = /[a-zA-Z\_\d]/.test(str[i]);
    if (str[i] === '$' || (temp.startsWith('$') && isValidChar)) {
      temp = temp + str[i];
    } else if (!isValidChar) {
      temp.length && names.push(temp) && (temp = '');
    }
  }
  temp.length && names.push(temp);
  return names.map((name) => name);
};

/**
 *
 * @example
 * url: 'http://localhost:8080/api/upload/file?n=@{field1.value === 1}&t=@{field2.value === field3.value}'
 * visible: '@{field1.value === 1}',
 * visible: '@{field1.value === field2.value}',
 */

export const parseExpr = (
  config: Object,
  ob$s: Record<string, Observable<any>>,
  effect: (path: string, result: string | boolean) => void,
  unmount$: Subject<undefined>,
) => {
  loop(config, (path, value) => {
    if (typeof value !== 'string' || !value.includes('@{')) return;
    // const experssions = value.match(/(?<=@{).*?(?=})/g);
    const experssions = value.match(/@\{[^@\{\}]*\}/g)?.map((str) => {
      return str.match(/@\{(.+)\}/)?.[1]!;
    });
    if (!experssions) return;

    let names!: string[];
    if (value.includes('$')) {
      names = experssions
        .map((str) => {
          return findVariableNames(str);
        })
        .flat();
    } else {
      names = experssions.map((experssion) => {
        const [name] = experssion.split('.');
        return name;
      });
    }

    const source$ = combineLatest(names.map((name) => ob$s[name.replace(/\$/, '')]));
    source$
      .pipe(
        takeUntil(unmount$),
        map((states) => {
          const source = states.reduce((acc, state, index) => {
            Object.assign(acc, {
              [names[index]]: state,
            });
            return acc;
          }, {});

          const result = template(value, {
            interpolate: /@\{(.+?)\}/g,
          })(source);
          // 非字符串类型
          if (result === '[object Object]') {
            return get(source, value.slice(2, -1));
          } else if (result === 'true') {
            return true;
          } else if (result === 'false') {
            return false;
          } else {
            return result;
          }
        }),
        tap((result) => {
          effect(path, result);
        }),
      )
      .subscribe();
  });
};

export const useParseExpr = (fieldState: IField) => {
  const { formStore } = useContext(FormContext);
  const { dispatch, field$s } = formStore;
  const { name } = fieldState;
  const unmount$ = useUnmount();

  useEffect(() => {
    // 遍历所有属性 查找包含@{}表达式的属性 并观察
    parseExpr(
      fieldState,
      field$s,
      (path: string, result: string | boolean) => {
        dispatch(name, {
          [path]: result,
        });
      },
      unmount$,
    );
  }, []);
};
