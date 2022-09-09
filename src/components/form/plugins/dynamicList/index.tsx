import React from 'react';
import plugins, { CustomFieldProps } from '../../ts/hooks';
import { Form, Input, AutoComplete } from 'antd';
import { IField, Option, Value } from '../../type/field';
// import useRegister from '../../ts/useRegister';
import { default as immSetValues } from '../../../../lib/setValues';
import { InputProps } from 'antd/lib/input';
import { AutoCompleteProps } from 'antd/lib/auto-complete';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';

const { Item: FormItem } = Form;

const InputList = (props: CustomFieldProps) => {
  // const {state, onChange} = useRegister(props);
  const { fieldState, internalValue, internalValue$, blur$, change$ } = props;
  const { width, error, props: antProps, placeholder } = fieldState;
  const stateValues = (internalValue ?? ['']) as Readonly<string[]>;

  const remove = (index: number) => {
    internalValue$.next(
      stateValues.filter((_, i) => {
        return i !== index;
      }),
    );
    // change、blur时触发上报
    change$.next();
    blur$.next();
  };

  const push = (value: string) => {
    internalValue$.next(stateValues.concat([value]));
    // change、blur时触发上报
    change$.next();
    blur$.next();
  };

  const style = {
    width,
  };

  const fieldStyle = {
    width: style.width ? Number(style.width) - 45 : undefined,
  };

  return (
    <>
      {stateValues.map((item, index) => {
        return (
          <FormItem
            key={index}
            style={style}
            validateStatus={
              typeof error === 'object' && error?.index === index ? 'error' : undefined
            }
          >
            <Input
              value={item}
              style={fieldStyle}
              onChange={(e) => {
                const value = e.target.value;
                let newValue = immSetValues(stateValues, {
                  [index]: value,
                });
                // newValue = newValue.filter(item => !!item.length);
                internalValue$.next(newValue.length ? newValue : undefined);
                change$.next();
              }}
              onBlur={() => blur$.next()}
              {...(antProps as InputProps)}
              placeholder={placeholder}
            />
            {stateValues.length > 1 && (
              <MinusCircleOutlined
                style={{ marginLeft: 8 }}
                onClick={() => {
                  remove(index);
                }}
              />
            )}
            <PlusCircleOutlined
              type="plus-circle-o"
              style={{ marginLeft: 8 }}
              onClick={() => {
                push('');
              }}
            />
          </FormItem>
        );
      })}
    </>
  );
};

// @ts-ignore
plugins.field.tap('inputlist', (customFieldProps) => {
  // @ts-ignore
  return <InputList {...customFieldProps} />;
});

const AutoCompleteList = (props: CustomFieldProps) => {
  const { internalValue$, blur$, change$, internalValue, fieldState } = props;

  // const {state, onChange} = useRegister(props.fieldState);
  const { width, error, options, props: antProps, placeholder } = fieldState;
  // const stateValues = (state.value ?? ['']) as Readonly<string[]>;

  const stateValues = (internalValue ?? ['']) as Readonly<string[]>;

  const remove = (index: number) => {
    internalValue$.next(
      stateValues.filter((_, i) => {
        return i !== index;
      }),
    );
    // remove时触发上报、校验
    change$.next();
    blur$.next();
  };

  const push = (value: string) => {
    internalValue$.next(stateValues.concat([value]));
    // push时触发上报、校验
    change$.next();
    blur$.next();
  };

  const style = {
    width,
  };

  const fieldStyle = {
    width: style.width ? Number(style.width) - 45 : undefined,
  };

  const dataSource = (options as Option[])?.map((option) => {
    const transformOption = typeof option === 'string' ? { label: option, value: option } : option;
    const { label, value, ...others } = transformOption;
    return {
      ...others,
      text: label as string,
      label: label as string,
      value: String(value),
    };
  });

  return (
    <>
      {stateValues.map((item, index) => {
        return (
          <FormItem
            key={index}
            validateStatus={
              typeof error === 'object' && error?.index === index ? 'error' : undefined
            }
            style={style}
          >
            <AutoComplete
              value={item}
              options={dataSource}
              onChange={(value) => {
                let newValue = immSetValues(stateValues, {
                  [index]: value,
                });
                // newValue = newValue.filter(item => !!item.length);
                internalValue$.next(newValue.length ? newValue : undefined);
                change$.next();
              }}
              onBlur={() => {
                blur$.next();
              }}
              {...(antProps as AutoCompleteProps)}
              style={fieldStyle}
              placeholder={placeholder}
            />
            {stateValues.length > 1 && (
              <MinusCircleOutlined
                style={{ marginLeft: 8 }}
                onClick={() => {
                  remove(index);
                }}
              />
            )}
            <PlusCircleOutlined
              type="plus-circle-o"
              style={{ marginLeft: 8 }}
              onClick={() => {
                push('');
              }}
            />
          </FormItem>
        );
      })}
    </>
  );
};

// @ts-ignore
plugins.field.tap('autocompletelist', (customFieldProps) => {
  // @ts-ignore
  return <AutoCompleteList {...customFieldProps} />;
});
