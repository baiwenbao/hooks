import React from 'react';
import { Input, Select } from 'antd';
import * as model from './ts/model';
import { FormStore } from '../../ts/createFormStore';
import { IField, Value } from '../../type/field';
import { Subject } from 'rxjs';

export declare type PhoneProps = {
  formStore: FormStore;
  fieldState: IField;
  internalValue$: Subject<Value>;
  internalValue: Value;
  blur$: Subject<undefined>;
};

const Phone = (props: PhoneProps) => {
  const { fieldState, internalValue$, internalValue, blur$ } = props;
  const { width } = fieldState;
  const [codeValue = '+86', phoneValue] = (internalValue ?? []) as string[];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    if (typeof e === 'string') {
      internalValue$.next([e, phoneValue]);
    } else {
      const { value } = e.target;
      internalValue$.next([codeValue, value]);
    }
  };

  const select = (
    <Select<string> value={codeValue} onChange={(value) => handleChange(value)}>
      {model.prefixOptions.map(({ value, label }) => {
        return (
          <Select.Option value={value} key={value}>
            {label}
          </Select.Option>
        );
      })}
    </Select>
  );

  return (
    <Input
      addonBefore={select}
      value={phoneValue}
      onChange={handleChange}
      style={{ width }}
      onBlur={() => blur$.next()}
    />
  );
};

export default Phone;
