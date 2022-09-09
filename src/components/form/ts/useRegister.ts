import { FormContext } from './createFormStore';
import { IField, Value } from '../type/field';
import { useObservable } from 'rxjs-hooks';
import { useCallback, useContext } from 'react';

const useRegister = (field: IField) => {
  const { formStore } = useContext(FormContext);
  const { register, $, setValues } = formStore;
  const { name } = field;

  name && register(name, field);

  const state = useObservable(() => $(field.name!), field);

  const onChange = useCallback((value: Readonly<Value>) => {
    name &&
      setValues(
        {
          [name]: value,
        },
        'fieldChange',
      );
  }, []);

  return {
    state,
    onChange,
  };
};

export default useRegister;
