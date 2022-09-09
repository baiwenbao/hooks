import React from 'react';
import { Input, Select } from 'antd';
import * as model from './ts/model';
import plugins, { CustomFieldProps } from '../../ts/hooks';

const Phone = (props: CustomFieldProps) => {
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
      onBlur={() => blur$.next(undefined)}
    />
  );
};

// @ts-ignore
plugins.field.tap('phone', (customFieldProps) => {
  // @ts-ignore
  return <Phone {...customFieldProps} />;
});
