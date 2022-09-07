import { __assign, __rest, __spreadArray } from "tslib";
import { useContext } from 'react';
import { get } from 'lodash';
import { FormContext, isOptionField } from './createFormStore';
import { useObservable } from 'rxjs-hooks';
import { map, switchMap, tap, distinctUntilChanged, takeUntil, filter, debounce, catchError, } from 'rxjs/operators';
import useUnmount from '../../../lib/useUnmount';
import Axios from 'axios';
import { from, interval, merge, of } from 'rxjs';
import { message } from 'antd';
export var keyValueMapping = function (options, mapping) {
    if (!options)
        return;
    if (Array.isArray(mapping)) {
        var labelName_1 = mapping[0], valueName_1 = mapping[1];
        return options.map(function (option) {
            return __assign(__assign({}, option), { label: option[labelName_1], value: option[valueName_1] });
        });
    }
    else {
        return options.map(function (option) {
            var _a = mapping(option), label = _a[0], value = _a[1];
            return __assign(__assign({}, option), { label: label, value: value });
        });
    }
};
var useOptions = function (formStore, field) {
    var _a = useContext(FormContext).request, request = _a === void 0 ? Axios : _a;
    var dispatch = formStore === null || formStore === void 0 ? void 0 : formStore.dispatch;
    var type = field.type, name = field.name;
    var isAutoComplete = type === 'autocomplete';
    var unmount$ = useUnmount();
    return useObservable(function (_, inputs$) {
        var field$ = inputs$.pipe(takeUntil(unmount$), map(function (_a) {
            var field = _a[0];
            return field;
        }), filter(function (field) {
            return isOptionField(field.type) && !!field.options;
        }));
        var options$ = field$.pipe(map(function (field) { return field.options; }), distinctUntilChanged());
        var syncOptions$ = options$.pipe(filter(function (options) { return Array.isArray(options); }), map(function (options) {
            return options.map(function (option) {
                return typeof option === 'string'
                    ? {
                        label: option,
                        value: option,
                    }
                    : option;
            });
        }));
        var asyncOptions$ = field$.pipe(filter(function (field) { return 'url' in field.options; }), filter(function (field) {
            if (!isAutoComplete)
                return true;
            var options = field.options, value = field.value;
            var _a = options.allowEmpty, allowEmpty = _a === void 0 ? true : _a;
            return isAutoComplete && !allowEmpty ? !!value : true;
        }), map(function (field) { return field.options; }), distinctUntilChanged(), debounce(function (options) { var _a; return interval((_a = options.debounceTime) !== null && _a !== void 0 ? _a : 500); }), switchMap(function (options) {
            var url = options.url, params = options.params, data = options.data, headers = options.headers, _a = options.method, method = _a === void 0 ? 'get' : _a, path = options.path, mapping = options.mapping, values = options.values, others = __rest(options, ["url", "params", "data", "headers", "method", "path", "mapping", "values"]);
            var res$ = from(request(__assign({ method: method, url: url, params: method === 'get' ? __assign({}, params) : {}, data: method === 'post' ? __assign({}, data) : {}, headers: headers }, others)));
            return res$.pipe(map(function (res) {
                var options = keyValueMapping(path ? get(res, "".concat(path)) : res, mapping);
                return __spreadArray(__spreadArray([], (values !== null && values !== void 0 ? values : []), true), (options !== null && options !== void 0 ? options : []), true);
            }), catchError(function (e) {
                message.error(JSON.stringify(e));
                return of(undefined);
            }));
        }));
        return merge(syncOptions$, asyncOptions$).pipe(tap(function (options) {
            // 存储options
            dispatch === null || dispatch === void 0 ? void 0 : dispatch(name, {
                __options__: options,
            });
        }));
    }, undefined, [field]);
};
export default useOptions;
//# sourceMappingURL=useOptions.js.map