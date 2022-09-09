import moment from 'moment';
import compose from 'lodash/fp/compose';
import { format as mathFormat } from 'mathjs';

export enum Formatter {
  'yuan' = 1,
  'fen',
  'percent',
  'thousands',
  'float',
  'time',
}

const isNumber = (value: unknown) => {
  return !Number.isNaN(Number(value));
};

// 浮点数运算精度
const calc = (value: unknown) => {
  return (isNumber(value) && mathFormat(Number(value), { precision: 14 })) ?? value;
};

const yuan = (value: unknown) => {
  return calc(Number(value) / 100);
};

const fen = (value: unknown) => {
  return calc(Number(value) * 100);
};

const percent = (value: unknown) => {
  return calc(Number(value) * 100) + '%';
};

const thousands = (value: unknown) => {
  return Number(value).toLocaleString();
};

const float = (precision: number) => (value: unknown) => {
  return parseFloat(Number(value).toFixed(precision));
};

const getFormatFn = (formatter: string) => {
  switch (formatter) {
    case 'yuan':
      return yuan;
    case 'fen':
      return fen;
    case 'percent':
      return percent;
    case 'thousands':
      return thousands;
    default:
      // float 和 自定义
      if (formatter.startsWith('float')) {
        const [, len] = formatter.split('|');
        return float(Number(len));
      } else if (formatter.startsWith('time')) {
        const [, timeSchema] = formatter.split('|');
        return (value: unknown) => moment(value as string).format(timeSchema);
      } else {
        return new Function('value', `return ${formatter}`);
      }
  }
};

// formatters: ['fen', 'float|2', 'value + 1']
const composed = (value: unknown, formatters: string | string[]) => {
  const fns = Array.isArray(formatters)
    ? formatters.map((formatter) => getFormatFn(formatter))
    : [getFormatFn(formatters)];
  //@ts-ignore
  return compose(fns)(value);
};

const format = (value: unknown, formatter?: string | string[]) => {
  if (typeof value === 'undefined' || !formatter) return value;

  return composed(value, formatter);
};

export default format;
