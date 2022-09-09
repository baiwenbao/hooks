import { IField } from '../type/field';
import { useEffect, useContext } from 'react';
import { FormContext } from './createFormStore';
import { filter, tap, takeUntil, debounceTime } from 'rxjs/operators';
import useUnmount from '../../../lib/useUnmount';
import format from '../../../lib/format';
import useUpdate from '../../../lib/useUpdate';
import { merge } from 'rxjs';
import { default as immSet } from '../../../lib/setValues';

const utils = {
  format,
};

const useListener = (field: IField) => {
  const { name, listener } = field;
  const {
    formStore: { $, dispatch },
  } = useContext(FormContext);
  const unMount$ = useUnmount();
  const update$ = useUpdate(listener);

  useEffect(() => {
    const listeners = Array.isArray(listener) ? listener : listener && [listener];
    listeners?.forEach((listener) => {
      const { watch, condition, set } = listener;
      const watchs = Array.isArray(watch) ? watch : [watch];
      $(watchs, {
        include: 'value',
      })
        .pipe(
          debounceTime(0), // 防止设置 error 属性和 配置的rules、required 竞争状态
          takeUntil(merge(unMount$, update$)),
          filter((values) => {
            if (typeof condition === 'undefined') return true;
            const result = new Function(...watchs, 'utils', `return ${condition}`)(
              ...values,
              utils,
            );
            return !!result;
          }),
          tap((values) => {
            let fieldPart = set;

            const updateKeys = Object.keys(set);
            updateKeys.forEach((key) => {
              const fn = new Function(...watchs, 'utils', `return ${set[key]}`);

              const value = fn(...values, utils);

              fieldPart = immSet(fieldPart, {
                [key]: value,
              });
            });

            // const newField = Object.keys(set).reduce((acc, key) => {
            // 	const fn = new Function(
            // 		...watchs,
            // 		'utils',
            // 		`return ${set[key]}`
            // 	);

            // 	const value = fn(...values, utils);

            // 	return immSet(acc, {
            // 		[key]: value
            // 	});
            // }, field);
            dispatch(name, fieldPart);
          }),
        )
        .subscribe();
    });
  }, [listener]);
};

export default useListener;
