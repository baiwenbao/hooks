import Schema from 'async-validator';
import { FormStore } from './createFormStore';

export declare type Error = {
  field: string;
  message: string;
  index?: number;
};

export const validateFields = (
  fieldNames: string[],
  formStore: Pick<FormStore, 'field$s' | 'dispatch'>,
  from?: string,
) => {
  const allRules = {};
  const allValues = {};
  const { field$s, dispatch } = formStore;

  fieldNames.forEach((fieldName) => {
    const field$ = field$s[fieldName];
    const state = field$.getValue();
    const { rules } = state;
    if (rules && rules.length > 0) {
      Object.assign(allValues, {
        [fieldName]: state.value,
      });
      Object.assign(allRules, {
        [fieldName]: rules,
      });
    }
  });

  const validator = new Schema(allRules);

  // {first: true} 遇到第一个错误 则终止校验
  return validator.validate(
    allValues,
    {
      first: false,
      firstFields: true,
    },
    (errors: Error[]) => {
      if (errors) {
        errors.forEach((error) => {
          dispatch(
            error.field,
            {
              error,
            },
            from,
          );
        });
      } else {
        fieldNames.forEach((fieldName) => {
          if (typeof field$s[fieldName].getValue().error === 'undefined') return;
          dispatch(
            fieldName,
            {
              error: undefined,
            },
            from,
          );
        });
      }
      // callback && callback(errors);
    },
  );
};
