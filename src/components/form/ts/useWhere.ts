import { useContext } from 'react';
import { of, combineLatest } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { Where, IField, Values, WhereContent } from '../type/field';
import { FormContext } from './createFormStore';
import { IFormItem } from '../type/formitem';
import useUnmount from '../../../lib/useUnmount';
import { IForm } from '../type/form';

// {
//     a: {
//         type: 'eq',
//         content: [1, 2]
//     },
//     b: [3, 4]
// }
export const check = (where: Where, values: Values, name: keyof Where) => {
  const value = values[name];
  const { type, content } =
    typeof where[name] === 'object' &&
    Reflect.has(where[name] as WhereContent, 'type') &&
    Reflect.has(where[name] as WhereContent, 'content')
      ? (where[name] as Where)
      : {
          type: 'eq',
          content: where[name],
        };

  switch (type) {
    case 'eq':
      return Array.isArray(content) ? content.includes(value) : String(value) === String(content);
    case 'uneq':
      return Array.isArray(content) ? !content.includes(value) : String(value) !== String(content);
    case 'gt':
      console.assert(typeof content === 'number', `${content}类型必须是string或number`);
      return Number(value) > <number>content;
    case 'lt':
      return Number(value) < <number>content;
  }
};

const useWhere = (struct: IField | IFormItem | Required<IForm>['groups'][0], property: string) => {
  const {
    formStore: { dispatch, $ },
  } = useContext(FormContext);
  const unmount$ = useUnmount();

  // @ts-ignore
  const where = struct[property] as Where;

  const bool = useObservable<boolean, [Where | Where[]]>(
    (_, inputs$) =>
      inputs$.pipe(
        takeUntil(unmount$),
        map(([where]) => where),
        distinctUntilChanged(),
        switchMap((where) => {
          if (
            typeof where === 'boolean' ||
            typeof where === 'undefined' ||
            typeof where === 'string'
          ) {
            return of(where);
          }

          const whereList = Array.isArray(where) ? where : [where];
          const where$s = whereList.map((where) => {
            const depNames = Object.keys(where);
            if (depNames.length === 0) return of(true);

            return $(depNames).pipe(
              map((states) => {
                const depValues = states.reduce((acc, state) => {
                  const { name, value } = state;
                  return Object.assign(acc, {
                    [name!]: value,
                  });
                }, {});

                return depNames.every((name) => {
                  return check(where, depValues, name);
                });
              }),
            );
          });

          // 组合where[], 满足条件之一则返回true
          return combineLatest(where$s).pipe(
            map((bools) => {
              return bools.some((bool) => bool);
            }),
          );
        }),
        tap((bool) => {
          // 存储到field store
          if ('name' in struct) {
            const { name } = struct;
            dispatch(name, {
              [`__${property}__`]: bool,
            });
          } else if ('field' in struct) {
            // 同步formItem visible状态到field
            const { field } = struct;
            const fields = Array.isArray(field) ? field : [field];
            fields.forEach(({ name }) => {
              dispatch(name, {
                [`__${property}__`]: bool,
              });
            });
          } else if ('formItems' in struct) {
            const { formItems } = struct as Required<IForm>['groups'][0];
            formItems.forEach((formItem) => {
              const { field } = formItem;
              const fields = Array.isArray(field) ? field : [field];
              fields.forEach(({ name }) => {
                dispatch(name, {
                  [`__${property}__`]: bool,
                });
              });
            });
          }
        }),
      ),
    true,
    [where],
  );

  return bool;
};

export default useWhere;
