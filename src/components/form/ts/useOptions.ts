import { useContext } from 'react';
import { IField, Option, AsyncOption, OptionableTypes } from '../type/field';
import { get } from 'lodash';
import { FormStore, FormContext, isOptionField } from './createFormStore';
import { useObservable } from 'rxjs-hooks';
import {
  map,
  switchMap,
  tap,
  distinctUntilChanged,
  takeUntil,
  filter,
  debounce,
  catchError,
} from 'rxjs/operators';
import useUnmount from '../../../lib/useUnmount';
import Axios from 'axios';
import { from, interval, merge, Observable, of } from 'rxjs';
import { message } from 'antd';

export const keyValueMapping = (
  options: Partial<Option>[] | undefined,
  mapping: string[] | ((record: Partial<Option>) => [Option[keyof Option], Option[keyof Option]]),
): Option[] | undefined => {
  if (!options) return;

  if (Array.isArray(mapping)) {
    const [labelName, valueName] = mapping;

    return options.map((option) => {
      return {
        ...option,
        label: option[<'label'>labelName]!,
        value: option[<'value'>valueName]!,
      };
    });
  } else {
    return options.map((option) => {
      const [label, value] = mapping(option);
      return {
        ...option,
        label: <Option['label']>label,
        value: <Option['value']>value,
      };
    });
  }
};

const useOptions = (formStore: FormStore | undefined, field: IField<OptionableTypes>) => {
  const { request = Axios } = useContext(FormContext);

  const dispatch = formStore?.dispatch;
  const { type, name } = field;
  const isAutoComplete = type === 'autocomplete';

  const unmount$ = useUnmount();

  return useObservable<undefined | Option[], [IField<OptionableTypes>]>(
    (_, inputs$) => {
      const field$ = inputs$.pipe(
        takeUntil(unmount$),
        map(([field]) => field),
        filter((field) => {
          return isOptionField(field.type) && !!field.options;
        }),
      );

      const options$ = field$.pipe(
        map((field) => field.options),
        distinctUntilChanged(),
      );

      const syncOptions$ = options$.pipe(
        filter((options) => Array.isArray(options)),
        map((options) => {
          return (options as Option[]).map((option: Option | string) => {
            return typeof option === 'string'
              ? {
                  label: option,
                  value: option,
                }
              : option;
          });
        }),
      ) as Observable<Option[]>;

      const asyncOptions$ = field$.pipe(
        filter((field) => 'url' in field.options!),
        filter((field) => {
          if (!isAutoComplete) return true;
          const { options, value } = field;
          const { allowEmpty = true } = options as AsyncOption;
          return isAutoComplete && !allowEmpty ? !!value : true;
        }),
        map<IField, AsyncOption>((field) => field.options as AsyncOption),
        distinctUntilChanged(),
        debounce((options) => interval(options.debounceTime ?? 500)),
        switchMap((options) => {
          const {
            url,
            params,
            data,
            headers,
            method = 'get',
            path,
            mapping,
            values,
            ...others
          } = options;

          const res$ = from(
            request({
              method,
              url,
              params: method === 'get' ? { ...params } : {},
              data: method === 'post' ? { ...data } : {},
              headers,
              ...others,
            }),
          );

          return res$.pipe(
            map((res) => {
              const options = keyValueMapping(path ? get(res, `${path}`) : res, mapping);
              return [...(values ?? []), ...(options ?? [])];
            }),
            catchError((e) => {
              message.error(JSON.stringify(e));
              return of(undefined);
            }),
          );
        }),
      );

      return merge(syncOptions$, asyncOptions$).pipe(
        tap<Option[] | undefined>((options) => {
          // 存储options
          dispatch?.(name, {
            __options__: options,
          });
        }),
      );
    },
    undefined,
    [field],
  );
};

export default useOptions;
