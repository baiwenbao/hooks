/**
 * @description 字段名解构
 * @example {
 *     name: 'start,end',
 *     type: 'daterange',
 *     initialValue: ['2020-1-1', '2020-2-3']
 * }
 */

import plugins from '../../ts/hooks';
import { IField } from '../../type/field';
import { FormStore } from '../../ts/createFormStore';

plugins.register.tap('rest name', (field: IField, formStore: FormStore) => {
  const { name, initialValue, format, props, submit } = field;
  const isRestName = name?.includes(',');
  if (!isRestName) return field;
  const names = name?.split(',');
  const { register } = formStore;
  const initialValues = initialValue as Readonly<unknown>[];
  names?.forEach((name, index) => {
    // @ts-ignore
    register(name, {
      initialValue: initialValues?.[index],
      format,
      props,
      name,
    });
  });

  return {
    ...field,
    submit: submit ?? false,
  };
});

plugins.dispatch.tap('rest name', (field, formStore) => {
  const { name, value } = field;
  const isRestName = name?.includes(',');
  if (!isRestName) return field;
  const names = name?.split(',');
  const { dispatch } = formStore;
  names?.forEach((name, index) => {
    dispatch(name, {
      value: (value as Readonly<unknown>[])?.[index],
    });
  });
  return field;
});
