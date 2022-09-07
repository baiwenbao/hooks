import { useContext } from 'react';
import { of, combineLatest } from 'rxjs';
import { map, tap, switchMap, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import { FormContext } from './createFormStore';
import useUnmount from '../../../lib/useUnmount';
// {
//     a: {
//         type: 'eq',
//         content: [1, 2]
//     },
//     b: [3, 4]
// }
export var check = function (where, values, name) {
    var value = values[name];
    var _a = typeof where[name] === 'object' &&
        Reflect.has(where[name], 'type') &&
        Reflect.has(where[name], 'content')
        ? where[name]
        : {
            type: 'eq',
            content: where[name]
        }, type = _a.type, content = _a.content;
    switch (type) {
        case 'eq':
            return Array.isArray(content)
                ? content.includes(value)
                : String(value) === String(content);
        case 'uneq':
            return Array.isArray(content)
                ? !content.includes(value)
                : String(value) !== String(content);
        case 'gt':
            console.assert(typeof content === 'number', "".concat(content, "\u7C7B\u578B\u5FC5\u987B\u662Fstring\u6216number"));
            return Number(value) > content;
        case 'lt':
            return Number(value) < content;
    }
};
var useWhere = function (struct, property) {
    var _a = useContext(FormContext).formStore, dispatch = _a.dispatch, $ = _a.$;
    var unmount$ = useUnmount();
    // @ts-ignore
    var where = struct[property];
    var bool = useObservable(function (_, inputs$) {
        return inputs$.pipe(takeUntil(unmount$), map(function (_a) {
            var where = _a[0];
            return where;
        }), distinctUntilChanged(), switchMap(function (where) {
            if (typeof where === 'boolean' || typeof where === 'undefined' || typeof where === 'string') {
                return of(where);
            }
            var whereList = Array.isArray(where) ? where : [where];
            var where$s = whereList.map(function (where) {
                var depNames = Object.keys(where);
                if (depNames.length === 0)
                    return of(true);
                return $(depNames).pipe(map(function (states) {
                    var depValues = states.reduce(function (acc, state) {
                        var _a;
                        var name = state.name, value = state.value;
                        return Object.assign(acc, (_a = {},
                            _a[name] = value,
                            _a));
                    }, {});
                    return depNames.every(function (name) {
                        return check(where, depValues, name);
                    });
                }));
            });
            // 组合where[], 满足条件之一则返回true
            return combineLatest(where$s).pipe(map(function (bools) {
                return bools.some(function (bool) { return bool; });
            }));
        }), tap(function (bool) {
            var _a;
            // 存储到field store
            if ('name' in struct) {
                var name_1 = struct.name;
                dispatch(name_1, (_a = {},
                    _a["__".concat(property, "__")] = bool,
                    _a));
            }
            else if ('field' in struct) {
                // 同步formItem visible状态到field
                var field = struct.field;
                var fields = Array.isArray(field) ? field : [field];
                fields.forEach(function (_a) {
                    var _b;
                    var name = _a.name;
                    dispatch(name, (_b = {},
                        _b["__".concat(property, "__")] = bool,
                        _b));
                });
            }
            else if ('formItems' in struct) {
                var formItems = struct.formItems;
                formItems.forEach(function (formItem) {
                    var field = formItem.field;
                    var fields = Array.isArray(field) ? field : [field];
                    fields.forEach(function (_a) {
                        var _b;
                        var name = _a.name;
                        dispatch(name, (_b = {},
                            _b["__".concat(property, "__")] = bool,
                            _b));
                    });
                });
            }
        }));
    }, true, [where]);
    return bool;
};
export default useWhere;
//# sourceMappingURL=useWhere.js.map