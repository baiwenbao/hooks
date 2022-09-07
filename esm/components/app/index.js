import { __assign, __rest } from "tslib";
import React, { createContext, Fragment, useContext, useEffect, useMemo, useRef, useState } from 'react';
import * as Ant from 'antd';
import { travelConf } from './ts/travelConf';
import { runApi } from '../../lib/api';
import { get, omit } from 'lodash';
import { parseExpr } from '../../lib/useParseExpr';
import useUnmount from '../../lib/useUnmount';
import setValues from '../../lib/setValues';
import { BehaviorSubject } from 'rxjs';
import useForm from '../form';
import { filter, takeUntil, tap } from 'rxjs/operators';
import useCrud from '../crud';
import loop from '../../lib/loop';
import { useObservable } from 'rxjs-hooks';
import { internalPluginsFactory } from './plugins';
// pluguns start
import './plugins/transformConf';
export var AppContext = createContext(undefined);
var Com = function (props) {
    var _a, _b;
    var conf = props.conf, rest = __rest(props, ["conf"]);
    var type = conf.type, id = conf.id, data = conf.data, transform = conf.transform, template = conf.template, initialProps = conf.props, children = conf.children;
    var AntCom = (_a = get(Ant, type)) !== null && _a !== void 0 ? _a : Fragment;
    var _c = useContext(AppContext), com$s = _c.com$s, api$s = _c.api$s;
    var data$ = useMemo(function () { return (id ? com$s[id] : new BehaviorSubject(data)); }, []);
    var unmount$ = useUnmount();
    // 强制更新
    var _d = useState(0), _ = _d[0], update = _d[1];
    // 持久化记录最新的props
    var comRef = useRef(__assign(__assign({}, omit(conf, 'children')), { props: omit(conf.props, 'formConfig') }));
    var childrenRef = useRef(children);
    useEffect(function () {
        parseExpr(comRef.current, __assign(__assign({}, com$s), api$s), function (path, result) {
            var _a, _b;
            // 记录data数据
            if (path === 'data') {
                data$.next(result);
            }
            else if (path.startsWith('data')) {
                var _c = path.split('.'), dataPath = _c[1];
                data$.next(setValues(data$.getValue(), (_a = {},
                    _a[dataPath] = result,
                    _a)));
            }
            comRef.current = setValues(comRef.current, (_b = {},
                _b[path] = result,
                _b));
            update(function (val) { return val + 1; });
        }, unmount$);
        if (typeof children === 'string' && children.includes('@{')) {
            parseExpr({ children: children }, __assign(__assign({}, com$s), api$s), function (_, result) {
                childrenRef.current = result;
                update(function (val) { return val + 1; });
            }, unmount$);
        }
        return function () {
            id && Reflect.deleteProperty(com$s, id);
        };
    }, []);
    if (type === 'Form') {
        var _e = useForm(initialProps), form = _e.form, formStore_1 = _e.formStore;
        useEffect(function () {
            // data数据同步到form组件内部
            data$
                .pipe(takeUntil(unmount$), tap(function (data) {
                data && formStore_1.setValues(data);
            }))
                .subscribe();
            var displayAs = initialProps.formConfig.displayAs;
            if (displayAs) {
                formStore_1.setStatus(displayAs);
            }
        }, []);
        formStore_1.plugins.dispatch.tap('get real time values', function (field, formStore) {
            Promise.resolve().then(function () {
                var values = formStore.getValues();
                data$.next(values);
            });
            return field;
        });
        return form;
    }
    if (type === 'CRUD') {
        var crud = useCrud(initialProps.crudConfig).crud;
        return crud;
    }
    if (template) {
        var dataState = useObservable(function () {
            return data$.pipe(filter(function (data) { return !(typeof data === 'string' && data.includes('@{')); }));
        });
        var list = dataState ? (_b = transform === null || transform === void 0 ? void 0 : transform(dataState)) !== null && _b !== void 0 ? _b : dataState : undefined;
        var type_1 = template.type, props_1 = template.props, children_1 = template.children;
        console.assert(get(Ant, type_1) !== undefined, "get(Ant, ".concat(type_1, ") is undefined"));
        var ChildCom_1 = get(Ant, type_1);
        var vars_1 = [];
        loop(template.props, function (path, value) {
            if (typeof value === 'string' && value.startsWith('$item')) {
                vars_1.push({ path: path, value: value });
            }
        });
        return (React.createElement(AntCom, __assign({}, rest, comRef.current.props), list === null || list === void 0 ? void 0 : list.map(function (item, index) {
            var _a;
            var newProps = props_1;
            vars_1.forEach(function (variable) {
                var _a;
                var path = variable.path, value = variable.value;
                newProps = setValues(newProps, (_a = {},
                    _a[path] = new Function('$item', "return ".concat(value))(item),
                    _a));
            });
            var newChildren = typeof children_1 === 'string' && children_1.startsWith('$item')
                ? new Function('$item', "return ".concat(children_1))(item)
                : children_1;
            return (React.createElement(ChildCom_1, __assign({}, newProps, { key: (_a = newProps.key) !== null && _a !== void 0 ? _a : index }), newChildren));
        })));
    }
    return (React.createElement(AntCom, __assign({}, rest, comRef.current.props), typeof conf.children === 'string'
        ? childrenRef.current
        : Array.isArray(conf.children)
            ? conf.children.map(function (childConf, index) {
                var _a, _b;
                return (React.createElement(Com, __assign({ key: (_b = (_a = childConf.props) === null || _a === void 0 ? void 0 : _a.key) !== null && _b !== void 0 ? _b : index, conf: childConf }, childConf.props)));
            })
            : conf.children && React.createElement(Com, { conf: conf.children })));
};
export var useApp = function (props) {
    var internalPlugins = internalPluginsFactory();
    var _a = internalPlugins.transformConf.call({
        api: props.api,
        app: props.app
    }), app = _a.app, api = _a.api;
    var rootContextValue = props.appContextValue;
    var contextValue;
    var com$s = travelConf(app, rootContextValue === null || rootContextValue === void 0 ? void 0 : rootContextValue.com$s);
    if (rootContextValue) {
        contextValue = rootContextValue;
    }
    else {
        var api$s = useMemo(function () {
            if (!api)
                return {};
            return Object.keys(api).reduce(function (acc, key) {
                var _a;
                Object.assign(acc, (_a = {},
                    _a[key] = runApi(api[key]),
                    _a));
                return acc;
            }, {});
        }, []);
        var appContextValue = useRef({ com$s: com$s, api$s: api$s });
        contextValue = appContextValue.current;
    }
    return rootContextValue ? (React.createElement(Com, { conf: app })) : (React.createElement(AppContext.Provider, { value: contextValue },
        React.createElement(Com, { conf: app })));
};
//# sourceMappingURL=index.js.map