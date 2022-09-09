import plugins from '../../ts/hooks';
import { isDateField } from '../../ts/createFormStore';
import { IField } from '../../type/field';
import moment, { isMoment } from 'moment';

/**
 * @description 预处理日期控件initialValue
 */
const getInitialValue = (field: IField) => {
  const { name, initialValue, type, format } = field;

  if (typeof initialValue === 'undefined') return initialValue;
  if (isMoment(initialValue)) return initialValue;
  //  !initialValue.every(item => isMoment(item))
  if (Array.isArray(initialValue)) {
    // [-7, 7]当前日期的前后七天范围
    if (initialValue.every((item) => typeof item === 'number')) {
      const [start, end] = initialValue;
      return [moment().add(start, 'days'), moment().add(end, 'days')];
    } else if (initialValue.every((item) => typeof item === 'string')) {
      return initialValue.map((item) => moment(item));
    } else {
      return initialValue;
    }
  }
  if (initialValue === 'now') return moment();
  console.assert(typeof initialValue === 'string', `${name} initialValue应该是string类型`);
  const schema =
    type === 'date'
      ? 'YYYY-MM-DD'
      : type === 'datetime'
      ? 'YYYY-MM-DD HH:mm:ss'
      : type === 'time'
      ? 'HH:mm:ss'
      : 'YYYY-MM-DD';
  return moment(initialValue as string, schema);
};

/**
 * @description
 * 预处理日期控件initialValue: 'now'
 * initialValue: [-7, 7]  当前日期的前后七天范围
 */
plugins.register.tap('preset date field', (field) => {
  if (!field) return field;
  const { type } = field;
  // 非date控件
  if (!isDateField(type)) return field;

  return {
    ...field,
    initialValue: getInitialValue(field),
  };
});
