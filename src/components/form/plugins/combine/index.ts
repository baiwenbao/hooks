import { LabeledValue, SelectProps } from 'antd/lib/select';
import { default as immSetValues } from '../../../../lib/setValues';
import plugins from '../../ts/hooks';

/**
 * @description 字段组合
 * @example [{
 *     name: 'groups@title',
 * }, {
 *     name: 'groups@fieldNames'
 * }]
 */

const connector = '@';

plugins.beforeDispatch.tap('set combined', (name, state, formStore) => {
  const value = state.value as Readonly<{ [x: string]: string }>;
  const { dispatch, field$s } = formStore;
  if (typeof value === 'object' && value && !Array.isArray(value) && !field$s[name!]) {
    const keys = Object.keys(value);
    keys.forEach((key) => {
      const _name = `${name}${connector}${key}`;
      field$s[_name] &&
        dispatch(_name, {
          value: value[key],
        });
    });
  }
});

plugins.dispatch.tap('tags select', (state) => {
  const { type, props, value } = state;
  if (
    type === 'select' &&
    (props as SelectProps<LabeledValue>)?.mode === 'tags' &&
    typeof value === 'string'
  ) {
    return immSetValues(state, {
      value: value.split(','),
    });
  }
  return state;
});

plugins.beforeSubmit.tap('combine name', (values) => {
  if (typeof values === 'boolean') return values;

  const keys = Object.keys(values);
  return keys.reduce((acc, key) => {
    const isCombineName = key.includes(connector);
    const value = values[key];

    if (typeof value === 'undefined') return acc;

    if (!isCombineName) {
      return Object.assign(acc, {
        [key]: value,
      });
    }
    const [parent, property] = key.split(connector);
    if (acc[parent]) {
      Object.assign(acc[parent], {
        [property]: value,
      });
    } else {
      Object.assign(acc, {
        [parent]: {
          [property]: value,
        },
      });
    }
    return acc;
  }, {} as any);
});
