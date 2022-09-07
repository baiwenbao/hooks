import { useEffect, useContext } from 'react';
import { FormContext } from '../components/form/ts/createFormStore';
import { map, takeUntil, tap } from 'rxjs/operators';
import useUnmount from './useUnmount';
import loop from './loop';
import { template, get } from 'lodash';
import { combineLatest } from 'rxjs';
var findVariableNames = function (str) {
    var names = [];
    var temp = '';
    for (var i = 0; i < str.length; i++) {
        var isValidChar = (/[a-zA-Z\_\d]/).test(str[i]);
        if (str[i] === '$' || (temp.startsWith('$') && isValidChar)) {
            temp = temp + str[i];
        }
        else if (!isValidChar) {
            temp.length && names.push(temp) && (temp = '');
        }
    }
    temp.length && names.push(temp);
    return names.map(function (name) { return name; });
};
/**
 *
 * @example
 * url: 'http://localhost:8080/api/upload/file?n=@{field1.value === 1}&t=@{field2.value === field3.value}'
 * visible: '@{field1.value === 1}',
 * visible: '@{field1.value === field2.value}',
 */
export var parseExpr = function (config, ob$s, effect, unmount$) {
    loop(config, function (path, value) {
        var _a;
        if (typeof value !== 'string' || !value.includes('@{'))
            return;
        // const experssions = value.match(/(?<=@{).*?(?=})/g);
        var experssions = (_a = value.match(/@\{[^@\{\}]*\}/g)) === null || _a === void 0 ? void 0 : _a.map(function (str) {
            var _a;
            return (_a = str.match(/@\{(.+)\}/)) === null || _a === void 0 ? void 0 : _a[1];
        });
        if (!experssions)
            return;
        var names;
        if (value.includes('$')) {
            names = experssions.map(function (str) {
                return findVariableNames(str);
            }).flat();
        }
        else {
            names = experssions.map(function (experssion) {
                var name = experssion.split('.')[0];
                ;
                return name;
            });
        }
        var source$ = combineLatest(names.map(function (name) { return ob$s[name.replace(/\$/, '')]; }));
        source$
            .pipe(takeUntil(unmount$), map(function (states) {
            var source = states.reduce(function (acc, state, index) {
                var _a;
                Object.assign(acc, (_a = {},
                    _a[names[index]] = state,
                    _a));
                return acc;
            }, {});
            var result = template(value, {
                interpolate: /@\{(.+?)\}/g
            })(source);
            // 非字符串类型
            if (result === '[object Object]') {
                return get(source, value.slice(2, -1));
            }
            else if (result === 'true') {
                return true;
            }
            else if (result === 'false') {
                return false;
            }
            else {
                return result;
            }
        }), tap(function (result) {
            effect(path, result);
        }))
            .subscribe();
    });
};
export var useParseExpr = function (fieldState) {
    var formStore = useContext(FormContext).formStore;
    var dispatch = formStore.dispatch, field$s = formStore.field$s;
    var name = fieldState.name;
    var unmount$ = useUnmount();
    useEffect(function () {
        // 遍历所有属性 查找包含@{}表达式的属性 并观察
        parseExpr(fieldState, field$s, function (path, result) {
            var _a;
            dispatch(name, (_a = {},
                _a[path] = result,
                _a));
        }, unmount$);
    }, []);
};
//# sourceMappingURL=useParseExpr.js.map