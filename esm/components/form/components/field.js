import { __assign, __rest } from "tslib";
import React, { cloneElement, useEffect, useContext, memo, useMemo, useRef, } from 'react';
import { FormContext } from '../ts/createFormStore';
import { Input, Select, Checkbox, DatePicker, Radio, AutoComplete, TimePicker, Tooltip, TreeSelect, } from 'antd';
import useOption from '../ts/useOptions';
import { useObservable } from 'rxjs-hooks';
import useWhere from '../ts/useWhere';
import globalPlugins from '../ts/hooks';
import TextArea from 'antd/lib/input/TextArea';
import { useParseExpr } from '../../../lib/useParseExpr';
import format from '../ts/format';
import useListener from '../ts/useListener';
import { debounceTime, filter, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { BehaviorSubject, iif, Subject } from 'rxjs';
import useUnmount from '../../../lib/useUnmount';
import { setting } from '../ts/option';
var Link = setting.Link;
var Option = Select.Option;
var RangePicker = DatePicker.RangePicker;
var fieldValueToText = function (field) {
    var option = field.option, value = field.value;
    if (option && Array.isArray(option)) {
        return option.map(function (_a) {
            var label = _a.label;
            return label;
        }).join(',');
    }
    else if (option) {
        return option.label;
    }
    else if (Array.isArray(value)) {
        return value
            .map(function (item) {
            return format(__assign(__assign({}, field), { value: item }));
        })
            .join(',');
    }
    return format(field);
};
var internalFieldNames = [
    'input',
    'inputnumber',
    'inputlist',
    'autocompletelist',
    'select',
    'checkbox',
    'check',
    'radio',
    'text',
    'date',
    'datetime',
    'time',
    'daterange',
    'phone',
    'autocomplete',
    'textarea',
    'treeselect',
];
var Field = memo(function (_a) {
    var _b;
    var _c;
    var field = _a.field;
    var formStore = useContext(FormContext).formStore;
    var dispatch = formStore.dispatch, field$s = formStore.field$s, plugins = formStore.plugins, submitEvent$ = formStore.submitEvent$;
    var name = field.name;
    var internalValue$ = useMemo(function () { return new BehaviorSubject(undefined); }, []);
    var change$ = useMemo(function () { return new Subject(); }, []);
    var blur$ = useMemo(function () { return new Subject(); }, []);
    var focus$ = useMemo(function () { return new Subject(); }, []);
    // name && register(name, field);
    useParseExpr(field);
    var prevState = useRef();
    var fieldState = name
        ? useObservable(function () {
            return field$s[name].pipe(
            // 过滤由控件触发的value改动
            filter(function (state) {
                var _a;
                var __from__ = state.__from__, error = state.error;
                if (__from__ === 'fieldChange' && error === ((_a = prevState.current) === null || _a === void 0 ? void 0 : _a.error))
                    return false;
                return true;
            }), tap(function (state) {
                var value = state.value;
                /**外部数据同步到内部 */
                if (value !== internalValue$.getValue()) {
                    internalValue$.next(value);
                }
                prevState.current = state;
            }));
        }, field)
        : field;
    var _d = fieldState.type, type = _d === void 0 ? 'input' : _d, _e = fieldState.props, props = _e === void 0 ? {} : _e, value = fieldState.value, _f = fieldState.valuePropName, valuePropName = _f === void 0 ? 'value' : _f, width = fieldState.width, placeholder = fieldState.placeholder, displayAs = fieldState.displayAs, error = fieldState.error, tip = fieldState.tip, _g = fieldState.trigger, trigger = _g === void 0 ? 'change' : _g, link = fieldState.link, fieldVisible = fieldState.visible, submitOnEnter = fieldState.submitOnEnter;
    var options = useOption(formStore, fieldState);
    var visible = useWhere(fieldState, 'visible');
    var disabled = useWhere(fieldState, 'disabled');
    useListener(fieldState);
    var internalValue = useObservable(function () { return internalValue$; }, value);
    var unmount$ = useUnmount();
    useEffect(function () {
        plugins.fieldMounted.call(field, formStore);
        /**value 上报 */
        var trigger$ = iif(function () { return trigger === 'change'; }, change$, blur$);
        trigger$
            .pipe(takeUntil(unmount$), debounceTime(setting.reportTime), withLatestFrom(internalValue$, field$s[name]), filter(function (_a) {
            var value = _a[1], state = _a[2];
            if (Object.is(value, state.value))
                return false;
            return true;
        }), tap(function (_a) {
            var value = _a[1];
            dispatch(name, {
                value: value,
            }, 'fieldChange');
        }))
            .subscribe();
    }, []);
    var antdField;
    var fieldValue = Number.isNaN(internalValue) ? undefined : internalValue;
    switch (type) {
        case 'input':
            antdField = React.createElement(Input, null);
            break;
        case 'password':
            antdField = React.createElement(Input.Password, null);
            break;
        case 'inputnumber':
            antdField = React.createElement(Input, { type: "number" });
            break;
        case 'textarea':
            antdField = React.createElement(TextArea, null);
            break;
        case 'select':
            antdField = (React.createElement(Select, { allowClear: true }, options === null || options === void 0 ? void 0 : options.map(function (option) {
                var label = option.label, value = option.value;
                return (React.createElement(Option, { value: value, key: value }, label));
            })));
            break;
        case 'checkbox':
            antdField = React.createElement(Checkbox.Group, { options: options !== null && options !== void 0 ? options : undefined });
            break;
        case 'radio':
            antdField = React.createElement(Radio.Group, { options: options !== null && options !== void 0 ? options : undefined });
            break;
        case 'date':
            antdField = React.createElement(DatePicker, null);
            break;
        case 'datetime':
            antdField = React.createElement(DatePicker, { showTime: true });
            break;
        case 'time':
            antdField = React.createElement(TimePicker, null);
            break;
        case 'daterange':
            antdField = React.createElement(RangePicker, null);
            break;
        case 'treeselect':
            antdField = React.createElement(TreeSelect, null);
            break;
        case 'autocomplete':
            var dataSource = options === null || options === void 0 ? void 0 : options.map(function (_a) {
                var label = _a.label, value = _a.value, others = __rest(_a, ["label", "value"]);
                return (__assign(__assign({}, others), { text: label, value: String(value) }));
            });
            antdField = React.createElement(AutoComplete, { options: dataSource });
            break;
        case 'text':
            antdField = React.createElement(React.Fragment, null, fieldValue);
            break;
        default:
            if (typeof type !== 'undefined') {
                var globalCustomTap = globalPlugins.field.taps.find(function (_a) {
                    var name = _a.name;
                    return name === type;
                });
                var customTap = plugins.field.taps.find(function (_a) {
                    var name = _a.name;
                    return name === type;
                });
                console.assert(!!customTap || !!globalCustomTap, "\u7F3A\u5931\u81EA\u5B9A\u4E49\u63A7\u4EF6".concat(type));
                var customFieldProps = {
                    fieldState: fieldState,
                    formStore: formStore,
                    internalValue: internalValue,
                    internalValue$: internalValue$,
                    change$: change$,
                    blur$: blur$,
                };
                var cusField = ((_c = customTap === null || customTap === void 0 ? void 0 : customTap.fn(customFieldProps)) !== null && _c !== void 0 ? _c : globalCustomTap === null || globalCustomTap === void 0 ? void 0 : globalCustomTap.fn(customFieldProps));
                antdField = cloneElement(cusField, {
                    fieldState: fieldState,
                    formStore: formStore,
                    internalValue$: internalValue$,
                    internalValue: internalValue,
                    blur$: blur$,
                    change$: change$,
                });
            }
            else {
                antdField = React.createElement(React.Fragment, null, fieldValue);
            }
    }
    // visible
    if (visible === false || fieldVisible === false) {
        return null;
    }
    // width
    if (typeof width !== 'undefined' && fieldState) {
        props.style = __assign(__assign({}, props.style), { width: width });
    }
    var _value = typeof fieldValue === 'string' && fieldValue.includes('@{') ? undefined : fieldValue;
    var clonedProps = __assign(__assign({}, props), (_b = { disabled: disabled }, _b[valuePropName !== null && valuePropName !== void 0 ? valuePropName : 'value'] = _value, _b.width = width, 
    // value: _value,
    _b.placeholder = placeholder, _b.onChange = function (e) {
        var value;
        if (e && typeof e === 'object' && 'target' in e) {
            value = e.target[valuePropName];
        }
        else {
            value = e;
        }
        internalValue$.next(value);
        change$.next();
        // props?.onChange(value);
    }, _b.onBlur = function () {
        blur$.next();
        plugins.blur.call(fieldState, formStore);
    }, _b.onPressEnter = function () {
        if (submitOnEnter) {
            submitEvent$.next();
        }
    }, _b));
    if (displayAs === 'preview' && internalFieldNames.includes(type)) {
        var result = fieldValueToText(fieldState);
        antdField = link ? (link.type === 'a' ? (React.createElement("a", { target: link.target, href: link.url }, result)) : (React.createElement(Link, { target: link.target, to: link.url }, result))) : (React.createElement(React.Fragment, null,
            React.createElement("span", { style: { width: width, display: 'inline-block' } }, result)));
    }
    var tipProps = tip && typeof tip === 'object' && 'title' in tip
        ? tip
        : {
            title: tip,
        };
    var node = cloneElement(antdField, clonedProps);
    // dynamiclist控件不添加 has-error className
    return (React.createElement("span", { className: error && typeof error.index === 'undefined' ? 'has-error' : '' }, tip ? React.createElement(Tooltip, __assign({}, tipProps), node) : node));
});
export default Field;
//# sourceMappingURL=field.js.map