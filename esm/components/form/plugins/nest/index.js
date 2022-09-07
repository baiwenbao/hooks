import { __assign } from "tslib";
import plugins from '../../ts/hooks';
import React, { Fragment, useEffect, useMemo, useRef } from 'react';
import { useForm } from '../../index';
import { Row } from 'antd';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { Subject } from 'rxjs';
import { debounceTime, filter, pluck, takeUntil } from 'rxjs/operators';
import { useObservable } from 'rxjs-hooks';
import update from 'immutability-helper';
import { uniqueId, omit } from 'lodash';
import useUnmount from '../../../../lib/useUnmount';
var NestItem = function (props) {
    var formConfig = props.formConfig, parentFormStore = props.parentFormStore, parentName = props.parentName, formStoresRef = props.formStoresRef, multiple = props.multiple, initialValues = props.initialValues, displayAs = props.displayAs;
    var _a = useForm({
        formConfig: formConfig
    }), form = _a.form, formStore = _a.formStore;
    useEffect(function () {
        // @ts-ignore
        formStoresRef.current.push(formStore);
        var plugins = formStore.plugins, field$s = formStore.field$s;
        plugins.initFormStore.tap('init form', function (formStore) {
            var allValues = formStoresRef.current.map(function (formStore) {
                return formStore.getValues();
            });
            parentFormStore.dispatch(parentName, {
                value: multiple ? allValues : allValues[0]
            }, 'fieldChange');
        });
        // 数据上行
        plugins.dispatch.tap('set parent value', function (state, formStore, updateState) {
            var name = state.name, _a = state.valuePropName, valuePropName = _a === void 0 ? 'value' : _a;
            var prevValue = field$s[name].getValue().value;
            if (state.__from__ === 'parent' ||
                !Reflect.has(updateState, valuePropName) ||
                prevValue === state.value)
                return state;
            Promise.resolve().then(function () {
                var allValues = formStoresRef.current.map(function (formStore) {
                    return formStore.getValues();
                });
                parentFormStore.dispatch(parentName, {
                    value: multiple ? allValues : allValues[0]
                }, state.__from__);
            });
            return state;
        });
        return function () {
            var index = formStoresRef.current.findIndex(function (_formStore) { return _formStore === formStore; });
            formStoresRef.current.splice(index, 1);
            formStore.remove();
        };
    }, []);
    useEffect(function () {
        // 设置初始值
        var values = omit(initialValues, 'uid');
        if (Object.keys(values).length) {
            formStore.setValues(values, 'parent');
        }
        else {
            formStore.resetFields(undefined, 'parent');
        }
    }, [initialValues]);
    useEffect(function () {
        displayAs && formStore.setStatus(displayAs);
    }, [displayAs]);
    return form;
};
var Nest = function (props) {
    var fieldState = props.fieldState, formStore = props.formStore;
    var formItems = fieldState.formItems, name = fieldState.name, multiple = fieldState.multiple, _a = fieldState.layout, layout = _a === void 0 ? 'horizontal' : _a, labelCol = fieldState.labelCol, labelAlign = fieldState.labelAlign, wrapperCol = fieldState.wrapperCol, displayAs = fieldState.displayAs, flatten = fieldState.flatten, span = fieldState.span;
    var field = formItems === null || formItems === void 0 ? void 0 : formItems[0].field;
    // console.assert(flatten ? multiple && formItems?.length === 1 && (Array.isArray(field) && field.length === 1) : true, 'flatten 配置不正确');
    var dataSource$ = useMemo(function () { return new Subject(); }, []);
    var dataSource = useObservable(function () { return dataSource$; });
    var formStoresRef = useRef([]);
    var ummount$ = useUnmount();
    var formConfig = useMemo(function () { return ({
        layout: layout,
        labelCol: labelCol,
        wrapperCol: wrapperCol,
        labelAlign: labelAlign,
        formItems: formItems,
        span: span
    }); }, [formItems]);
    useEffect(function () {
        var _a;
        var $ = formStore.$;
        // 记录子表单formStore
        formStore.childFormStoresRefs = (_a = formStore.childFormStoresRefs) !== null && _a !== void 0 ? _a : [];
        formStore.childFormStoresRefs.push(formStoresRef);
        // 数据下行
        $(name)
            .pipe(takeUntil(ummount$), debounceTime(50), filter(function (state) { return state.__from__ !== 'fieldChange'; }), pluck('value'))
            .subscribe(function (value) {
            if (flatten && multiple) {
                var name_1 = Array.isArray(field) ? field[0].name : field === null || field === void 0 ? void 0 : field.name;
                value = value
                    ? value.map(function (item) {
                        var _a;
                        return typeof item === 'object'
                            ? item
                            : (_a = {},
                                _a[name_1] = item,
                                _a);
                    })
                    : [{}];
            }
            var parentValue = Array.isArray(value)
                ? value.length
                    ? value
                    : [{}]
                : [value !== null && value !== void 0 ? value : {}];
            var parentValueWithUid = parentValue.map(function (value) {
                return Reflect.has(value, 'uid')
                    ? value
                    : Object.assign({}, value, {
                        uid: uniqueId()
                    });
            });
            dataSource$.next(parentValueWithUid);
        });
    }, []);
    var isPreview = displayAs === 'preview';
    var node = dataSource === null || dataSource === void 0 ? void 0 : dataSource.map(function (item, index) {
        var dispatch = formStore.dispatch;
        var minus = (React.createElement(MinusCircleOutlined, { style: { marginLeft: 8 }, onClick: function () {
                dataSource$.next(dataSource.filter(function (_a) {
                    var uid = _a.uid;
                    return item.uid !== uid;
                }));
                // 数据上行
                Promise.resolve().then(function () {
                    var allValues = formStoresRef.current.map(function (formStore) {
                        return formStore.getValues();
                    });
                    dispatch(name, {
                        value: allValues
                    }, 'fieldChange');
                });
            } }));
        var plus = (React.createElement(PlusCircleOutlined, { style: { marginLeft: 8 }, onClick: function () {
                var newValue = update(dataSource, {
                    $splice: [[index + 1, 0, { uid: uniqueId() }]]
                });
                dataSource$.next(newValue);
            } }));
        var icon = multiple && !isPreview ? (React.createElement("span", { style: { lineHeight: '32px' } },
            dataSource.length > 1 && minus,
            plus)) : null;
        var comboItem = (React.createElement(React.Fragment, null,
            React.createElement(NestItem, { formConfig: formConfig, parentFormStore: formStore, parentName: name, formStoresRef: formStoresRef, multiple: multiple, initialValues: item, displayAs: displayAs }),
            icon));
        return multiple ? (React.createElement(Row, { key: item.uid }, comboItem)) : (React.createElement(Fragment, { key: index }, comboItem));
    });
    return React.createElement(React.Fragment, null, node);
};
// @ts-ignore
plugins.field.tap('nest', function (customFieldProps) {
    // @ts-ignore
    return React.createElement(Nest, __assign({}, customFieldProps));
});
var travelFormStore = function (formStore, ret, level) {
    if (level === void 0) { level = 0; }
    var childFormStoresRefs = formStore.childFormStoresRefs;
    level++;
    childFormStoresRefs === null || childFormStoresRefs === void 0 ? void 0 : childFormStoresRefs.forEach(function (formStoresRef) {
        var formStores = formStoresRef.current;
        formStores === null || formStores === void 0 ? void 0 : formStores.forEach(function (formStore) {
            travelFormStore(formStore, ret, level);
        });
    });
    // 第一层不需要在这里校验
    if (level !== 0) {
        formStore.validate();
        var err = formStore.getErrors();
        if (err) {
            ret.isValid = false;
        }
    }
    return ret;
};
/**执行child form校验 如果有异常则终止提交 */
plugins.beforeSubmit.tap('nest validate', function (values, formStore) {
    var isValid = travelFormStore(formStore, { isValid: true }).isValid;
    return isValid ? values : false;
});
/**flatten */
plugins.getValue.tap('flatten nest field value', function (value, field) {
    var type = field.type, multiple = field.multiple, flatten = field.flatten;
    if (type !== 'nest' || !multiple || !flatten)
        return value;
    if (Array.isArray(value)) {
        return value.map(function (item) {
            if (typeof item === 'object')
                return Object.values(item)[0];
            return item;
        });
    }
    return value;
});
//# sourceMappingURL=index.js.map