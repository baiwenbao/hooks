import { Rule } from 'antd/lib/form';

declare type ValidateType =
  | 'match'
  | 'values'
  | 'valuesMatch'
  | 'length'
  | 'nrange'
  | 'accept'
  | 'except';

declare type Validator<T extends ValidateType = ValidateType> = {
  type: T;
  type_values: T extends 'match'
    ? 'number' | 'int' | 'posint' | 'long' | 'double' | 'date' | 'timestamp' | 'email' | 'url'
    : string;
};

const getValidators = (validates: string[]): Validator[] => {
  return validates.map((item: string) => {
    const [type, type_values] = item.split(':');
    return {
      type: type as Validator['type'],
      type_values,
    };
  });
};

const isNullValue = (value: any) => typeof value === 'undefined' || value === '' || value === null;

// required: false validate:[{type:int}, {type:long}, {type:length, type_values: -,5}]
// validateMsg: '不能为空,请填写数字,数字格式不对,字符串长度小于5'
const getRules = (
  required: boolean = false,
  validate: string = '',
  validateMsg: string = '校验失败',
  initialRules: Rule[] = [],
  requiredMsg?: string,
) => {
  if (required === true) {
    initialRules.push({
      required: true,
      message: requiredMsg || '不能为空',
    });
  }

  if (!validate) return initialRules;

  const ruleObjArr = getValidators(validate.split('###'));
  const validateMsgArr = validateMsg.split(','); // 假设多个errorMsg以逗号隔开
  const rules: Rule[] = initialRules;

  ruleObjArr.forEach((item: Validator, index: number) => {
    const { type, type_values } = item;
    const errMsg = validateMsgArr?.[index] ?? validateMsg;

    switch (type) {
      case 'match':
        if (type_values === 'number') {
          rules.push({
            validator(rule, value) {
              if (isNullValue(value)) return Promise.resolve();
              if (!Number.isNaN(Number(value))) {
                return Promise.resolve();
              } else {
                return Promise.reject(errMsg);
              }
            },
            message: '必选为数字类型',
          });
        } else if (type_values === 'int') {
          rules.push({
            type: 'integer',
            transform(value) {
              if (isNullValue(value)) return true;
              return Number(value);
            },
            message: errMsg,
          });
        } else if (type_values === 'posint') {
          rules.push({
            type: 'integer',
            min: 1,
            transform(value) {
              if (isNullValue(value)) return true;
              return Number(value);
            },
            message: errMsg,
          });
        } else if (type_values === 'long') {
          rules.push({
            validator(rule, value) {
              if (isNullValue(value)) return Promise.resolve();
              const val = Number(value);
              if (val >= -9223372036854775808 && val <= 9223372036854775807) {
                return Promise.resolve();
              } else {
                return Promise.reject(errMsg);
              }
            },
            message: errMsg,
          });
        } else if (type_values === 'double') {
          rules.push({
            validator(rule, value) {
              if (isNullValue(value)) return Promise.resolve();
              const val = Number(value);
              if (val >= -4.9e-324 && val <= 1.7976931348623157e308) {
                return Promise.resolve();
              } else {
                return Promise.reject(errMsg);
              }
            },
            message: errMsg,
          });
        } else if (type_values === 'date') {
          // yyyy-MM-DD
          rules.push({
            validator(rule, value) {
              if (isNullValue(value)) return Promise.resolve();
              if (
                eval(
                  '/^(?:(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))))$|^(?:((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/',
                ).test(value)
              ) {
                return Promise.resolve();
              } else {
                return Promise.reject(errMsg);
              }
            },
            message: errMsg,
          });
        } else if (type_values === 'timestamp') {
          // yyyy-MM-DD HH:mm:ss ?
          rules.push({
            validator(rule, value) {
              if (isNullValue(value)) return Promise.resolve();
              if (
                eval(
                  '/^(((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((04|08|12|16|[2468][048]|[3579][26])00))-0?2-29)) (20|21|22|23|[0-1]?\\d):[0-5][0-9]:[0-5][0-9]$/',
                ).test(value)
              ) {
                return Promise.resolve();
              } else {
                return Promise.reject(errMsg);
              }
            },
            message: errMsg,
          });
        } else if (type_values === 'email') {
          rules.push({
            type: 'email',
            message: errMsg,
          });
        } else {
          rules.push({
            validator(rule, value) {
              if (isNullValue(value)) return Promise.resolve();
              if (new RegExp(type_values).test(value)) {
                return Promise.resolve();
              } else {
                return Promise.reject(errMsg);
              }
            },
            message: errMsg,
          });
        }
        break;
      case 'values':
        rules.push({
          type: 'enum',
          enum: type_values.split(','),
          message: errMsg,
        });
        break;
      case 'length':
        var [min, max] = type_values.split(',');
        const minLen = min === '-' ? undefined : Number(min);
        const maxLen = max === '-' ? undefined : Number(max);

        rules.push({
          transform(value) {
            if (isNullValue(value)) return value;
            if (Array.isArray(value)) return value;
            return String(value);
          },
          validator(rule, value) {
            if (isNullValue(value)) return Promise.resolve();
            const isInRange =
              (typeof minLen === 'undefined' || value.length >= minLen) &&
              (typeof maxLen === 'undefined' || value.length <= maxLen);
            if (isInRange) {
              return Promise.resolve();
            } else {
              return Promise.reject(errMsg);
            }
          },
          message: errMsg,
        });
        break;
      case 'nrange':
        var [min, max] = type_values.split(',');
        const minNum = min === '-' ? undefined : parseFloat(min);
        const maxNum = max === '-' ? undefined : parseFloat(max);

        rules.push({
          transform(value) {
            if (isNullValue(value)) return value;
            return Number(value);
          },
          validator(rule, value) {
            if (isNullValue(value)) return Promise.resolve();

            const isInRange =
              (typeof minNum === 'undefined' || value >= minNum) &&
              (typeof maxNum === 'undefined' || value <= maxNum);
            if (isInRange) {
              return Promise.resolve();
            } else {
              return Promise.reject(errMsg);
            }
          },
          message: errMsg,
        });
        break;
    }
  });
  return rules;
};

export default getRules;
