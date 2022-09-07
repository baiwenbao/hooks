import { __spreadArray } from "tslib";
import { useEffect, useContext } from 'react';
import { FormContext } from './createFormStore';
import { filter, tap, takeUntil, debounceTime } from 'rxjs/operators';
import useUnmount from '../../../lib/useUnmount';
import format from '../../../lib/format';
import useUpdate from '../../../lib/useUpdate';
import { merge } from 'rxjs';
import { default as immSet } from '../../../lib/setValues';
var utils = {
    format: format
};
var useListener = function (field) {
    var name = field.name, listener = field.listener;
    var _a = useContext(FormContext).formStore, $ = _a.$, dispatch = _a.dispatch;
    var unMount$ = useUnmount();
    var update$ = useUpdate(listener);
    useEffect(function () {
        var listeners = Array.isArray(listener)
            ? listener
            : listener && [listener];
        listeners === null || listeners === void 0 ? void 0 : listeners.forEach(function (listener) {
            var watch = listener.watch, condition = listener.condition, set = listener.set;
            var watchs = Array.isArray(watch) ? watch : [watch];
            $(watchs, {
                include: 'value',
            })
                .pipe(debounceTime(0), // 防止设置 error 属性和 配置的rules、required 竞争状态
            takeUntil(merge(unMount$, update$)), filter(function (values) {
                if (typeof condition === 'undefined')
                    return true;
                var result = new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], watchs, false), ['utils', "return ".concat(condition)], false)))().apply(void 0, __spreadArray(__spreadArray([], values, false), [utils], false));
                return !!result;
            }), tap(function (values) {
                var fieldPart = set;
                var updateKeys = Object.keys(set);
                updateKeys.forEach(function (key) {
                    var _a;
                    var fn = new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], watchs, false), ['utils', "return ".concat(set[key])], false)))();
                    var value = fn.apply(void 0, __spreadArray(__spreadArray([], values, false), [utils], false));
                    fieldPart = immSet(fieldPart, (_a = {},
                        _a[key] = value,
                        _a));
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
            }))
                .subscribe();
        });
    }, [listener]);
};
export default useListener;
//# sourceMappingURL=useListener.js.map