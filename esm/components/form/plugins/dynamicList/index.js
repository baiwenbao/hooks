import { __assign, __rest } from "tslib";
import React from 'react';
import plugins from '../../ts/hooks';
import { Form, Input, AutoComplete } from 'antd';
// import useRegister from '../../ts/useRegister';
import { default as immSetValues } from '../../../../lib/setValues';
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
var FormItem = Form.Item;
var InputList = function (props) {
    // const {state, onChange} = useRegister(props);
    var fieldState = props.fieldState, internalValue = props.internalValue, internalValue$ = props.internalValue$, blur$ = props.blur$, change$ = props.change$;
    var width = fieldState.width, error = fieldState.error, antProps = fieldState.props, placeholder = fieldState.placeholder;
    var stateValues = (internalValue !== null && internalValue !== void 0 ? internalValue : ['']);
    var remove = function (index) {
        internalValue$.next(stateValues.filter(function (_, i) {
            return i !== index;
        }));
        // change、blur时触发上报
        change$.next();
        blur$.next();
    };
    var push = function (value) {
        internalValue$.next(stateValues.concat([value]));
        // change、blur时触发上报
        change$.next();
        blur$.next();
    };
    var style = {
        width: width
    };
    var fieldStyle = {
        width: style.width ? Number(style.width) - 45 : undefined
    };
    return (React.createElement(React.Fragment, null, stateValues.map(function (item, index) {
        return (React.createElement(FormItem, { key: index, style: style, validateStatus: typeof error === 'object' && (error === null || error === void 0 ? void 0 : error.index) === index
                ? 'error'
                : undefined },
            React.createElement(Input, __assign({ value: item, style: fieldStyle, onChange: function (e) {
                    var _a;
                    var value = e.target.value;
                    var newValue = immSetValues(stateValues, (_a = {},
                        _a[index] = value,
                        _a));
                    // newValue = newValue.filter(item => !!item.length);
                    internalValue$.next(newValue.length ? newValue : undefined);
                    change$.next();
                }, onBlur: function () { return blur$.next(); } }, antProps, { placeholder: placeholder })),
            stateValues.length > 1 && (React.createElement(MinusCircleOutlined, { style: { marginLeft: 8 }, onClick: function () {
                    remove(index);
                } })),
            React.createElement(PlusCircleOutlined, { type: 'plus-circle-o', style: { marginLeft: 8 }, onClick: function () {
                    push('');
                } })));
    })));
};
// @ts-ignore
plugins.field.tap('inputlist', function (customFieldProps) {
    // @ts-ignore
    return React.createElement(InputList, __assign({}, customFieldProps));
});
var AutoCompleteList = function (props) {
    var _a;
    var internalValue$ = props.internalValue$, blur$ = props.blur$, change$ = props.change$, internalValue = props.internalValue, fieldState = props.fieldState;
    // const {state, onChange} = useRegister(props.fieldState);
    var width = fieldState.width, error = fieldState.error, options = fieldState.options, antProps = fieldState.props, placeholder = fieldState.placeholder;
    // const stateValues = (state.value ?? ['']) as Readonly<string[]>;
    var stateValues = (internalValue !== null && internalValue !== void 0 ? internalValue : ['']);
    var remove = function (index) {
        internalValue$.next(stateValues.filter(function (_, i) {
            return i !== index;
        }));
        // remove时触发上报、校验
        change$.next();
        blur$.next();
    };
    var push = function (value) {
        internalValue$.next(stateValues.concat([value]));
        // push时触发上报、校验
        change$.next();
        blur$.next();
    };
    var style = {
        width: width
    };
    var fieldStyle = {
        width: style.width ? Number(style.width) - 45 : undefined
    };
    var dataSource = (_a = options) === null || _a === void 0 ? void 0 : _a.map(function (option) {
        var transformOption = typeof option === 'string' ? { label: option, value: option } : option;
        var label = transformOption.label, value = transformOption.value, others = __rest(transformOption, ["label", "value"]);
        return __assign(__assign({}, others), { text: label, label: label, value: String(value) });
    });
    return (React.createElement(React.Fragment, null, stateValues.map(function (item, index) {
        return (React.createElement(FormItem, { key: index, validateStatus: typeof error === 'object' && (error === null || error === void 0 ? void 0 : error.index) === index
                ? 'error'
                : undefined, style: style },
            React.createElement(AutoComplete, __assign({ value: item, options: dataSource, onChange: function (value) {
                    var _a;
                    var newValue = immSetValues(stateValues, (_a = {},
                        _a[index] = value,
                        _a));
                    // newValue = newValue.filter(item => !!item.length);
                    internalValue$.next(newValue.length ? newValue : undefined);
                    change$.next();
                }, onBlur: function () {
                    blur$.next();
                } }, antProps, { style: fieldStyle, placeholder: placeholder })),
            stateValues.length > 1 && (React.createElement(MinusCircleOutlined, { style: { marginLeft: 8 }, onClick: function () {
                    remove(index);
                } })),
            React.createElement(PlusCircleOutlined, { type: 'plus-circle-o', style: { marginLeft: 8 }, onClick: function () {
                    push('');
                } })));
    })));
};
// @ts-ignore
plugins.field.tap('autocompletelist', function (customFieldProps) {
    // @ts-ignore
    return React.createElement(AutoCompleteList, __assign({}, customFieldProps));
});
//# sourceMappingURL=index.js.map