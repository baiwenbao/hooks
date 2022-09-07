import { __assign, __rest, __spreadArray } from "tslib";
import React, { useContext, useMemo, useRef, useEffect, createContext, useCallback } from 'react';
import createFormStore, { FormContext, SchemaContext } from '../ts/createFormStore';
import { Table, Tooltip, Typography } from 'antd';
import FormItem from './formitem';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import useFormTable from '../../table';
import useUnmount from '../../../lib/useUnmount';
import { takeUntil, skip } from 'rxjs/operators';
import { merge } from 'rxjs';
import update from 'immutability-helper';
import format from '../ts/format';
// @ts-ignore
// import styles from '../index.module.scss';
var Text = Typography.Text;
var TableContext = createContext(undefined);
var TableRow = function (_a) {
    var index = _a.index, props = __rest(_a, ["index"]);
    var uid = props['data-row-key'];
    var _b = useContext(TableContext), formConfig = _b.formConfig, effect = _b.effect, dataSource = _b.dataSource;
    var record = dataSource.find(function (item) { return item.uid == uid; });
    var name = formConfig.name;
    var formStore = useMemo(function () { return createFormStore({ name: name }); }, []);
    var _c = useContext(TableContext), formsRef = _c.formsRef, setDataSource = _c.setDataSource;
    var unmount$ = useUnmount();
    useEffect(function () {
        var field$s = formStore.field$s, pick = formStore.pick;
        var formStores = formsRef.current;
        formStores.push(formStore);
        var names = Object.keys(field$s);
        effect === null || effect === void 0 ? void 0 : effect(formStore, record);
        // 用户修改控件值同步到dataSource
        merge.apply(void 0, pick(names)).pipe(takeUntil(unmount$), skip(names.length) // 忽略初始化渲染的undefined值
        )
            .subscribe(function (state) {
            var name = state.name;
            setDataSource(function (data) {
                var _a, _b;
                var index = data.list.findIndex(function (item) { return item.uid === record.uid; });
                return update(data, {
                    list: (_a = {},
                        _a[index] = (_b = {},
                            _b[name] = {
                                $set: format(state)
                            },
                            _b),
                        _a)
                });
            });
        });
        // dataSource中的数据回显到控件
        formStore.setValues(omit(record, 'uid'));
        return function () {
            formStore.remove();
        };
    }, []);
    var formContextRef = useRef({
        formStore: formStore
    });
    var schemaContextValue = useMemo(function () { return ({
        schema: formConfig
    }); }, [formConfig]);
    return useMemo(function () { return (React.createElement(FormContext.Provider, { value: formContextRef.current },
        React.createElement(SchemaContext.Provider, { value: schemaContextValue },
            React.createElement("tr", __assign({}, props))))); }, []);
};
var TableCell = function (props) {
    var index = props.index, formConfig = props.formConfig;
    var formItems = formConfig === null || formConfig === void 0 ? void 0 : formConfig.formItems;
    var formItemProps = omit(formItems === null || formItems === void 0 ? void 0 : formItems[index], 'extra');
    var formItemNode = useMemo(function () { return (React.createElement("td", null, formItems ? React.createElement(FormItem, { formItem: formItemProps }) : props.children)); }, []);
    return formItemNode;
};
var components = {
    body: {
        row: TableRow,
        cell: TableCell
    }
};
var useTableForm = function (props) {
    var _a, _b;
    var getData = props.getData, formConfig = props.formConfig, actions = props.actions, effect = props.effect, _tableProps = props.tableProps;
    var formsRef = useRef([]);
    var formItems = formConfig.formItems;
    var _c = useFormTable(getData), tableProps = _c.tableProps, mutate = _c.mutate;
    // 初始化数据增加uid
    (_a = tableProps.dataSource) === null || _a === void 0 ? void 0 : _a.forEach(function (item) {
        if (!item.uid) {
            Object.assign(item, {
                uid: uniqueId()
            });
        }
    });
    var columns = formItems.map(function (col, index) {
        var label = col.label, labelTip = col.labelTip, fields = col.field, extra = col.extra;
        var field = (Array.isArray(fields) ? fields : [fields])[0];
        var name = field.name, required = field.required;
        var tipProps = labelTip && typeof labelTip === 'object' && 'title' in labelTip
            ? labelTip
            : {
                title: labelTip
            };
        return {
            title: (React.createElement(React.Fragment, null,
                React.createElement(Tooltip, __assign({}, tipProps), label),
                required ? React.createElement("span", { style: { color: 'red' } }, "*") : '',
                React.createElement(Text, { strong: false, style: { fontSize: 12 } }, extra ? "(".concat(extra, ")") : ''))),
            dataIndex: name,
            onCell: function (record) { return ({
                record: record,
                formConfig: formConfig,
                // dataIndex: col.dataIndex,
                // title: col.title,
                index: index
            }); }
        };
    });
    actions &&
        columns.push({
            title: '操作',
            render: function (_, record, index) {
                return React.createElement(React.Fragment, null, actions(record, index));
            }
        });
    var add = useCallback(function (items) {
        if (items === void 0) { items = [{}]; }
        mutate(function (data) {
            return update(data, {
                list: {
                    $push: items.map(function (item) { return (__assign(__assign({}, item), { uid: uniqueId() })); })
                }
            });
        });
    }, [mutate]);
    var remove = useCallback(function (uid) {
        mutate(function (data) {
            var index = data.list.findIndex(function (item) { return item.uid === uid; });
            formsRef.current.splice(index, 1);
            return update(data, {
                list: {
                    $splice: [[index, 1]]
                }
            });
        });
    }, [mutate]);
    var move = useCallback(function (uid, pos) {
        mutate(function (data) {
            var _a, _b;
            var list = data.list;
            var curIndex = list.findIndex(function (item) { return item.uid === uid; });
            var index = curIndex + pos;
            if (index < 0 || index > list.length - 1)
                return data;
            // 调换位置
            _a = [list[index], list[curIndex]], list[curIndex] = _a[0], list[index] = _a[1];
            _b = [
                formsRef.current[index],
                formsRef.current[curIndex]
            ], formsRef.current[curIndex] = _b[0], formsRef.current[index] = _b[1];
            return update(data, {
                list: {
                    $set: __spreadArray([], list, true)
                }
            });
        });
    }, [mutate]);
    var submit = function (fn) {
        var _a;
        var formStores = formsRef.current;
        var errors = formStores
            .map(function (formStore) {
            formStore.validate();
            return formStore.getErrors();
        })
            .filter(Boolean);
        // if (errors.some(error => !!error)) return;
        fn &&
            fn(errors, (_a = tableProps.dataSource) === null || _a === void 0 ? void 0 : _a.map(function (item) { return omit(item, 'uid'); }).filter(function (item) { return !!Object.keys(item).length; }));
    };
    var tableContextValue = useMemo(function () { return ({
        formsRef: formsRef,
        setDataSource: mutate,
        formConfig: formConfig,
        effect: effect,
        dataSource: tableProps.dataSource
    }); }, [mutate]);
    var form = useMemo(function () { return (
    // @ts-ignore
    React.createElement(TableContext.Provider, { value: tableContextValue },
        React.createElement(Table, __assign({}, tableProps, { columns: columns, components: components, rowKey: function (_a) {
                var uid = _a.uid;
                return uid;
            }, 
            // onRow={(record) => ({ record, formConfig, effect }) as any}
            scroll: { x: true }, 
            // className={styles.table}
            // @ts-ignore
            pagination: {
                onChange: function () {
                    formsRef.current = [];
                }
            } }, _tableProps)))); }, [(_b = tableProps.dataSource) === null || _b === void 0 ? void 0 : _b.map(function (_a) {
            var uid = _a.uid;
            return uid;
        }).join(',')]);
    return {
        form: form,
        add: add,
        remove: remove,
        submit: submit,
        formStoresRef: formsRef,
        mutate: mutate,
        move: move,
        tableProps: tableProps
    };
};
export default useTableForm;
//# sourceMappingURL=tableForm.js.map