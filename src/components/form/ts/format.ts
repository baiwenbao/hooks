import { IField } from '../type/field';
import { isMoment, Moment } from 'moment';
import format from '../../../lib/format';

const fieldValueFormat = (field: IField) => {
  const { format: formatter, value, type } = field;
  if (typeof value === 'undefined') {
    return value;
  } else if (isMoment(value)) {
    const schema =
      type === 'date'
        ? 'YYYY-MM-DD'
        : type === 'datetime'
        ? 'YYYY-MM-DD HH:mm:ss'
        : type === 'time'
        ? 'HH:mm:ss'
        : 'YYYY-MM-DD';
    if (formatter) {
      return format(value, formatter);
    }
    return value.format(schema);
  } else if (type === 'daterange') {
    return (value as Moment[]).map((item) => {
      return format(item, formatter);
    });
  } else if (!formatter) {
    return value;
  } else {
    return format(value, formatter);
  }
};

export default fieldValueFormat;
