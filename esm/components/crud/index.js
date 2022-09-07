import { __assign, __rest } from "tslib";
import React, { useEffect, useMemo, useRef } from 'react';
import useForm, { setting } from '../form';
import useFormTable from '../table';
import { Col, Row, Table } from 'antd';
import { get, template } from 'lodash';
import { runApiAction, Action } from '../action';
import loop from '../../lib/loop';
import compose from 'lodash/fp/compose';
import useOptions from '../../components/form/ts/useOptions';
import immSet from '../../lib/setValues';
import pluginsFactory from './ts/plugins';
import { default as formplugins } from '../form/ts/hooks';
var Link = setting.Link;
export var defineCrudConfig = function (config) { return config; };
var filterColums = function (columns, type) {
    var curColumns = columns
        .filter(function (column) {
        var location = column.location;
        if (!location)
            return true;
        return Array.isArray(location) ? location.includes(type) : location === type;
    })
        .map(function (column) { return ({
        label: column.label,
        field: column.field,
    }); });
    return {
        columns: curColumns,
        type: type,
    };
};
var preHandleColumns = function (_a) {
    var columns = _a.columns, type = _a.type;
    var columnsClone = columns;
    loop(columns, function (path, value) {
        var _a;
        if (typeof value !== 'string' || !value.includes('$location'))
            return;
        var fn = new Function('$location', "return ".concat(value));
        columnsClone = immSet(columnsClone, (_a = {},
            _a[path] = fn(type),
            _a));
    });
    return columnsClone;
};
var ListOption = function (field) {
    var _a;
    var data = field.data;
    var stateOptions = useOptions(undefined, field);
    var label = (_a = stateOptions === null || stateOptions === void 0 ? void 0 : stateOptions.find(function (option) { return option.value === data; })) === null || _a === void 0 ? void 0 : _a.label;
    return React.createElement(React.Fragment, null, label);
};
var useCrud = function (props) {
    var plugins = useMemo(function () { return pluginsFactory(); }, []);
    var columns = props.columns, searchApi = props.searchApi, listPath = props.listPath, totalPath = props.totalPath, _a = props.manual, manual = _a === void 0 ? false : _a, actions = props.actions, rowKey = props.rowKey, defaultPageSize = props.defaultPageSize;
    var refreshRef = useRef();
    var _b = useMemo(function () {
        var addColumns = compose(preHandleColumns, filterColums)(columns, 'add');
        var editColumns = compose(preHandleColumns, filterColums)(columns, 'edit');
        var listColumns = compose(preHandleColumns, filterColums)(columns, 'list');
        var searchColumns = compose(preHandleColumns, filterColums)(columns, 'search');
        var listActions = actions.filter(function (action) {
            var name = action.name, location = action.location;
            return name === 'edit' || name === 'delete' || location === 'list';
        });
        var _listColumns = listColumns.map(function (column) {
            var label = column.label, field = column.field;
            var name = field.name, options = field.options, link = field.link;
            return {
                title: label,
                dataIndex: name,
                render: function (text, record) {
                    var ret = options ? React.createElement(ListOption, __assign({}, field, { data: text })) : text;
                    if (link) {
                        var url = template(link.url)(record);
                        return link.type === 'a' ? (React.createElement("a", { target: link.type, href: url }, ret)) : (React.createElement(Link, { to: url, target: link.target }, ret));
                    }
                    return ret;
                },
            };
        });
        if (listActions.length) {
            var pathWithVars_1 = [];
            loop(listActions, function (path, value) {
                if (typeof value !== 'string' || !value.includes('${'))
                    return;
                pathWithVars_1.push({
                    path: path,
                    value: value,
                });
            });
            _listColumns.push({
                title: '操作',
                render: function (_, record) {
                    // 替换配置中${pop}字段
                    var listActionsClone = listActions;
                    pathWithVars_1.forEach(function (_a) {
                        var _b;
                        var path = _a.path, value = _a.value;
                        listActionsClone = immSet(listActionsClone, (_b = {},
                            _b[path] = template(value)(record),
                            _b));
                    });
                    var buttons = listActionsClone
                        .filter(function (action) {
                        // 过滤不可见的button
                        var visible = action.visible;
                        if (typeof visible !== 'undefined') {
                            var visibleFn = new Function("return ".concat(visible));
                            return visibleFn() !== false;
                        }
                        return true;
                    })
                        .map(function (action, index) {
                        var name = action.name;
                        if (editColumns && name === 'edit') {
                            var editFormConfig = {
                                name: 'edit',
                                formItems: editColumns,
                            };
                            if (action.actionType === 'modal') {
                                action.modal.body = {
                                    type: 'form',
                                    formConfig: editFormConfig,
                                    values: record,
                                };
                                if (typeof action.modal.action.api === 'string') {
                                    action.modal.action.api = {
                                        url: action.modal.action.api,
                                        successCallback: function () { return refreshRef.current(); },
                                    };
                                }
                                else {
                                    action.modal.action.api.successCallback = function () { return refreshRef.current(); };
                                }
                            }
                        }
                        else if (action.actionType === 'api' && action.api) {
                            if (typeof action.api === 'string') {
                                action.api = {
                                    url: action.api,
                                    successCallback: function () { return refreshRef.current(); },
                                };
                            }
                            else {
                                action.api.successCallback = function () { return refreshRef.current(); };
                            }
                        }
                        return (React.createElement(Col, { key: index },
                            React.createElement(Action, __assign({ size: "small" }, action))));
                    });
                    return React.createElement(Row, { gutter: 8 }, buttons);
                },
            });
        }
        return {
            addColumns: addColumns,
            listColumns: plugins.tableColumns.call(_listColumns),
            searchColumns: searchColumns,
        };
    }, [columns]), addColumns = _b.addColumns, searchColumns = _b.searchColumns, listColumns = _b.listColumns;
    var searchActions = actions.filter(function (action) { return action.location === 'search' || action.name === 'search'; });
    var searchFormConfig = {
        name: 'search',
        layout: 'inline',
        formItems: searchColumns,
        buttons: searchActions.map(function (action) {
            var _a, _b, _c;
            var actionType = action.actionType, name = action.name;
            if (actionType === 'reset') {
                action.reset = function () { return search.reset(); };
            }
            else if (actionType === 'submit') {
                action.submit = function () {
                    return formStore.submit(function (err) {
                        if (err)
                            return;
                        search.submit();
                    });
                };
            }
            if (name === 'search') {
                action.label = (_a = action.label) !== null && _a !== void 0 ? _a : '搜索';
                action.type = (_b = action.type) !== null && _b !== void 0 ? _b : 'primary';
            }
            else if (name === 'reset') {
                action.label = (_c = action.label) !== null && _c !== void 0 ? _c : '重置';
            }
            return React.createElement(Action, __assign({}, action));
        }),
    };
    var _c = useForm({
        formConfig: searchFormConfig,
    }), form = _c.form, formStore = _c.formStore;
    var _d = useFormTable(function (_a) {
        var current = _a.current, pageSize = _a.pageSize, values = __rest(_a, ["current", "pageSize"]);
        if (!searchApi)
            return Promise.resolve({
                list: [],
                total: 0,
            });
        return runApiAction(searchApi, __assign({ pageNum: current, pageSize: pageSize }, values)).then(function (data) {
            console.assert(get(data, listPath) !== undefined, "get(data, ".concat(listPath, ") is undefined"));
            console.assert(get(data, totalPath) !== undefined, "get(data, ".concat(totalPath, ") is undefined"));
            return {
                list: get(data, listPath),
                total: get(data, totalPath),
            };
        });
    }, {
        formStore: formStore,
        manual: manual,
    }), tableProps = _d.tableProps, search = _d.search, refresh = _d.refresh;
    useEffect(function () {
        refreshRef.current = refresh;
    }, [refresh]);
    var headerActions = actions.filter(function (action) { return action.name === 'add' || action.name === 'export' || action.location === 'header'; });
    var headerNodes = headerActions === null || headerActions === void 0 ? void 0 : headerActions.map(function (action, index) {
        var _a, _b, _c;
        if (action.name === 'add') {
            var addFormConfig = {
                name: 'add',
                formItems: addColumns,
            };
            if (action.actionType === 'modal') {
                action.modal.body = {
                    type: 'form',
                    formConfig: addFormConfig,
                };
                if (typeof action.modal.action.api === 'string') {
                    action.modal.action.api = {
                        url: action.modal.action.api,
                        successCallback: function () { return refresh(); },
                    };
                }
                else {
                    action.modal.action.api.successCallback = function () { return refresh(); };
                }
            }
            action.label = (_a = action.label) !== null && _a !== void 0 ? _a : '新增';
            action.type = (_b = action.type) !== null && _b !== void 0 ? _b : 'primary';
        }
        else if (action.name === 'export') {
            action.label = (_c = action.label) !== null && _c !== void 0 ? _c : '导出';
        }
        return (React.createElement(Col, { key: index },
            React.createElement(Action, __assign({}, action))));
    });
    var crud = (React.createElement(React.Fragment, null,
        form,
        headerActions && (React.createElement(Row, { style: { marginBottom: 8 }, gutter: 8 }, headerNodes)),
        React.createElement(Table, __assign({ columns: listColumns }, tableProps, { rowKey: rowKey }))));
    return {
        crud: crud,
        list: {
            tableProps: tableProps,
            listColumns: listColumns,
        },
        search: {
            form: form,
            formStore: formStore,
        },
        plugins: plugins,
        formplugins: formplugins,
    };
};
export default useCrud;
//# sourceMappingURL=index.js.map