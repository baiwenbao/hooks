import { useState } from 'react';
import { IForm } from '../type/form';
import immSet from '../../../lib/setValues';

const useFormSchema = (schema: IForm) => {
  const [_schema, setSchema] = useState(schema);

  const updateSchema = (schemaPart: Partial<IForm> & { [x: string]: any }) => {
    setSchema((schema) => immSet(schema, schemaPart));
  };

  return {
    schema: _schema,
    updateSchema,
  };
};

export default useFormSchema;
