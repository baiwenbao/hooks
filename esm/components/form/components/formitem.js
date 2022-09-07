import { __assign, __rest, __spreadArray } from "tslib";
import useWhere from '../ts/useWhere';
import { Form, Col, Tooltip } from 'antd';
import Field from './field';
import React, { cloneElement, isValidElement, useContext, useEffect, useMemo, useState, } from 'react';
import { FormContext, SchemaContext } from '../ts/createFormStore';
import { useObservable } from 'rxjs-hooks';
import { debounceTime, map, switchMap } from 'rxjs/operators';
import { setting } from '../ts/option';
import { parseExpr } from '../../../lib/useParseExpr';
import useUnmount from '../../../lib/useUnmount';
import { isElement } from 'react-dom/test-utils';
var FormCol = function (props) {
    var layout = props.layout, span = props.span, width = props.width, restProps = __rest(props, ["layout", "span", "width"]);
    var widthProps = typeof width !== 'undefined'
        ? {
            style: {
                width: width,
            },
        }
        : { span: span };
    return layout === 'inline' ? React.createElement(React.Fragment, null, props.children) : React.createElement(Col, __assign({}, widthProps, restProps));
};
var FormItem = function (props) {
    var formStore = useContext(FormContext).formStore;
    var schema = useContext(SchemaContext).schema;
    var $ = formStore.$, dispatch = formStore.dispatch, register = formStore.register, plugins = formStore.plugins, field$s = formStore.field$s;
    var globalSpan = schema.span, layout = schema.layout, _a = schema.labelCol, globalLabelCol = _a === void 0 ? 4 : _a, _b = schema.wrapperCol, globalWrapperCol = _b === void 0 ? 20 : _b, globalWidth = schema.width;
    var formItem = props.formItem;
    var field = formItem.field, _c = formItem.span, span = _c === void 0 ? globalSpan !== null && globalSpan !== void 0 ? globalSpan : 24 : _c, pull = formItem.pull, push = formItem.push, block = formItem.block, _d = formItem.whiteSpace, whiteSpace = _d === void 0 ? React.createElement(React.Fragment, null, "\u00A0\u00A0") : _d, inlineLayout = formItem.inlineLayout, _e = formItem.labelCol, labelCol = _e === void 0 ? globalLabelCol : _e, _f = formItem.wrapperCol, wrapperCol = _f === void 0 ? globalWrapperCol : _f, _g = formItem.width, width = _g === void 0 ? globalWidth : _g, _ = formItem.visible, labelTip = formItem.labelTip, others = __rest(formItem, ["field", "span", "pull", "push", "block", "whiteSpace", "inlineLayout", "labelCol", "wrapperCol", "width", "visible", "labelTip"]);
    var fields = Array.isArray(field) ? field : [field];
    var isInline = layout === 'inline';
    // 注册field到formStore
    fields.forEach(function (field) {
        var name = field.name;
        name && register(name, field);
    });
    var unmount$ = useUnmount();
    var visible = useWhere(formItem, 'visible');
    var _h = useState(true), formItemVisible = _h[0], setFormItemVisible = _h[1];
    useEffect(function () {
        parseExpr({ visible: formItem.visible }, field$s, function (path, value) {
            if (typeof value === 'boolean') {
                setFormItemVisible(value);
                fields.forEach(function (field) {
                    var name = field.name;
                    name && dispatch(name, { visible: value }); // 可见状态同步到field
                });
            }
        }, unmount$);
    }, []);
    var names = fields.map(function (field) { return field.name; }).filter(Boolean);
    var states = names.length
        ? useObservable(function (_, inputs$) {
            return inputs$.pipe(
            // 切换visible状态后重新计算
            switchMap(function () { return $(names); }), debounceTime(300), map(function (states) {
                // 过滤不可见field
                return states.filter(function (state) { return state.visible !== false; });
            }));
        }, [], [visible])
        : undefined;
    var state = states === null || states === void 0 ? void 0 : states.find(function (state) { return state.error; });
    var errorText = typeof (state === null || state === void 0 ? void 0 : state.error) === 'object' ? state === null || state === void 0 ? void 0 : state.error.message : state === null || state === void 0 ? void 0 : state.error;
    // field rules include required prop
    var isRequired = states === null || states === void 0 ? void 0 : states.some(function (state) {
        return state.rules &&
            state.rules.some(function (rule) {
                if ('required' in rule) {
                    return !!rule.required;
                }
                return false;
            });
    });
    var isEditable = states === null || states === void 0 ? void 0 : states.every(function (state) { return state.displayAs !== 'preview'; });
    var isLayoutTable = layout === 'table';
    // table 不展示label
    var _label = others.label;
    var tipProps = labelTip && typeof labelTip === 'object' && 'title' in labelTip
        ? labelTip
        : {
            title: labelTip,
        };
    var label = isLayoutTable ? undefined : labelTip ? (React.createElement(Tooltip, __assign({}, tipProps), _label)) : (_label);
    var inlineFields = fields.map(function (field, index) { return React.createElement(Field, { key: index, field: field }); });
    var formItemElement = useMemo(function () {
        var _a, _b;
        return (React.createElement(FormCol, { width: width, layout: layout, span: span, push: push, pull: pull },
            React.createElement(Form.Item, __assign({}, others, { labelCol: { span: isInline ? undefined : labelCol }, wrapperCol: { span: isInline ? undefined : wrapperCol }, label: label, 
                // validateStatus={state ? 'error' : undefined}
                help: React.createElement("span", { style: { color: '#f5222d' } }, errorText), required: isEditable && isRequired, style: { marginBottom: 0 } }), (_b = (_a = replaceStr(inlineLayout, inlineFields)) !== null && _a !== void 0 ? _a : replaceJSXChildren(inlineLayout, inlineFields, formStore)) !== null && _b !== void 0 ? _b : inlineFields.map(function (field, index) { return (React.createElement("span", { key: index, style: { marginRight: index === fields.length - 1 ? 0 : 4 } },
                field,
                ' ')); }))));
    }, [
        formItem,
        layout,
        globalSpan,
        globalLabelCol,
        globalWrapperCol,
        isRequired,
        isEditable,
        errorText,
    ]);
    useEffect(function () {
        plugins.formItemMounted.call(formItem, formStore);
    }, []);
    if (visible === false || formItemVisible === false) {
        return null;
    }
    if (isInline)
        return formItemElement;
    if (block)
        return React.createElement("div", { style: { width: '100%' } }, formItemElement);
    return formItemElement;
};
export default FormItem;
var splitStrs = function (inlineLayout) {
    var strs = [];
    var prev = 0;
    var index = 0;
    while (index <= inlineLayout.length - 1) {
        if (inlineLayout[index] === setting.inlineTag && inlineLayout[index - 1] !== '\\') {
            var str = inlineLayout.slice(prev, index);
            strs.push(str);
            prev = index + 1;
        }
        if (index === inlineLayout.length - 1) {
            strs.push(inlineLayout.slice(prev, index + 1));
        }
        ++index;
    }
    return strs.map(function (str) {
        return str.replace(new RegExp("\\\\".concat(setting.inlineTag), 'g'), setting.inlineTag);
    });
};
var replaceStr = function (inlineLayout, fields) {
    if (typeof inlineLayout !== 'string')
        return;
    var strs = splitStrs(inlineLayout);
    var ret = __spreadArray([], fields, true);
    var index = 0;
    while (strs.length) {
        ret.splice(index + index, 0, strs.shift());
        ++index;
    }
    return ret;
};
var replaceJSXChildren = function (node, fields, formStore) {
    if (!isValidElement(node))
        return;
    var children = React.Children.map(node.props.children, function (item) {
        if (typeof item === 'string' && item.includes(setting.inlineTag)) {
            return replaceStr(item, fields);
        }
        return isElement(item) ? cloneElement(item, { formStore: formStore }) : item;
    });
    return cloneElement.apply(void 0, __spreadArray([node, {}], children, false));
};
//# sourceMappingURL=formitem.js.map