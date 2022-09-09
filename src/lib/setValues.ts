import update from 'immutability-helper';

declare type Values = {
  [x: string]: unknown;
};

type Path<T extends Object, K extends string | number> = K extends keyof T
  ?
      | `${K}${T[K] extends object
          ? `.${Path<T[K], Exclude<keyof T[K], symbol>>}` | `.${Exclude<keyof T[K], symbol>}`
          : ''}`
      | K
  : never;

/**
 * @example setValues({a: {b: {c: 1}}}, {'a.b.c': 2})
 */
const setValues = <T extends unknown>(target: T, values: Values): T => {
  let next = target;
  const keys = Object.keys(values);

  keys.forEach((path) => {
    // 将{'options.params.a': newValue}转换成{options: {params: {a: {$set: newValue}}}}
    const newValue = values[path];
    const keys = path.split('.');
    const action = keys.reduceRight(
      (acc, key) => {
        return {
          [key]: acc,
        };
      },
      { $set: newValue } as any,
    );
    next = update(next, action);
  });

  return next;
};

export default setValues;

const push = <T extends Object>(
  target: T,
  path: Path<T, Exclude<keyof T, symbol | number>>,
  value: unknown,
) => {
  const keys = path.split('.');
  const action = keys.reduceRight(
    (acc, key) => {
      return {
        [key]: acc,
      };
    },
    { $push: value } as any,
  );
  return update(target, action);
};
