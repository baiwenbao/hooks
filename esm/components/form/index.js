import { __assign } from "tslib";
import React, { useMemo, useEffect, useRef } from 'react';
import createFormStore, { FormContext, SchemaContext } from './ts/createFormStore';
import { Form, Row, Col } from 'antd';
import FormItem from './components/formitem';
import FormGroups from './components/formGroup';
import plugins from './ts/hooks';
import { default as useRegister } from './ts/useRegister';
import useFormSchema from './ts/useFormSchema';
import './plugins';
import { setting } from './ts/option';
import { Action } from '../action';
import callFormModal from './ts/formModal';
import callFormDrawer from './ts/formDrawer';
var defineFormConfig = function (formConfig) {
    return formConfig;
};
export var formStoreMap = new Map();
var useForm = function (_a) {
    var formConfig = _a.formConfig, _b = _a.request, request = _b === void 0 ? setting.request : _b;
    var name = formConfig.name, labelAlign = formConfig.labelAlign;
    var formStore = useMemo(function () { return createFormStore({ name: name }); }, []);
    var plugins = formStore.plugins;
    /**调用注册loadConfig plugins */
    var enhanceFormConfig = plugins.loadConfig.call(formConfig);
    var _c = useFormSchema(enhanceFormConfig), schema = _c.schema, updateSchema = _c.updateSchema;
    var formItems = schema.formItems, _d = schema.layout, layout = _d === void 0 ? 'horizontal' : _d, _e = schema.labelCol, labelCol = _e === void 0 ? 4 : _e, _f = schema.wrapperCol, wrapperCol = _f === void 0 ? 20 : _f, groups = schema.groups, _g = schema.buttons, buttons = _g === void 0 ? [] : _g, justify = schema.justify, _h = schema.gutter, gutter = _h === void 0 ? 16 : _h, _j = schema.span, span = _j === void 0 ? 24 : _j, width = schema.width, actions = schema.actions;
    var isInline = layout === 'inline';
    var groupElement = React.createElement(FormGroups, { groups: groups });
    var formItemWrapperCol = isInline || groups || typeof width !== 'undefined' ? {} : { offset: labelCol / (24 / span) };
    var formItemStyle = {
        marginLeft: typeof width !== 'undefined'
            ? (width / 24) * labelCol + (typeof gutter === 'number' ? gutter : gutter[0]) / 2
            : 0,
        marginRight: 0,
    };
    var actionButtons = actions === null || actions === void 0 ? void 0 : actions.map(function (actionProps, index) {
        return React.createElement(Action, __assign({ key: index, context: { formStore: formStore } }, actionProps));
    });
    if (actionButtons) {
        buttons.push.apply(buttons, actionButtons);
    }
    var buttonElement = !!(buttons === null || buttons === void 0 ? void 0 : buttons.length) && (React.createElement(Col, null,
        React.createElement(Form.Item, { wrapperCol: formItemWrapperCol, style: formItemStyle }, buttons === null || buttons === void 0 ? void 0 : buttons.map(function (button, index) {
            var style = {
                marginRight: index === buttons.length - 1 ? 0 : 8,
            };
            return (React.createElement("span", { key: index, style: style }, button));
        }))));
    var formElement = (React.createElement(Row, { justify: justify, gutter: isInline ? undefined : gutter }, formItems === null || formItems === void 0 ? void 0 :
        formItems.map(function (formItem, index) {
            return React.createElement(FormItem, { formItem: formItem, key: index });
        }),
        isInline && buttonElement));
    useEffect(function () {
        plugins.initFormStore.call(formStore, formConfig);
        formStore.name && formStoreMap.set(formStore.name, formStore);
        return function () {
            // 清理formStore
            formStore.remove();
            formStore.name && formStoreMap.delete(formStore.name);
        };
    }, [formStore]);
    var formContextRef = useRef({
        formStore: formStore,
        request: request,
    });
    var schemaContextValue = useMemo(function () { return ({
        schema: schema,
    }); }, [schema]);
    var formProvider = useMemo(function () {
        return (React.createElement(FormContext.Provider, { value: formContextRef.current },
            React.createElement(SchemaContext.Provider, { value: schemaContextValue },
                React.createElement(Form
                // name={name}
                , { 
                    // name={name}
                    labelAlign: labelAlign, layout: layout, labelCol: { span: labelCol }, wrapperCol: { span: wrapperCol }, labelWrap: true, style: { wordBreak: 'break-all' } },
                    formItems && formElement,
                    groups && groupElement,
                    !isInline && buttons && buttonElement))));
    }, [schema]);
    return {
        formStore: formStore,
        updateSchema: updateSchema,
        updateConfig: updateSchema,
        form: formProvider,
    };
};
export default useForm;
export { plugins, useRegister, useForm, defineFormConfig, setting, callFormModal, callFormDrawer };
//# sourceMappingURL=index.js.map