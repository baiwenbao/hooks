import { __assign, __awaiter, __generator } from "tslib";
import React from 'react';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { validateFields } from './validate';
import format from './format';
import moment from 'moment';
import { default as immSetValues } from '../../../lib/setValues';
import getRules from '../../../lib/rules';
import { internalPluginsFactory } from './hooks';
import update from 'immutability-helper';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import { omit, get, pick as lodashPick } from 'lodash';
export var isDateField = function (type) {
    return type ? ['date', 'datetime', 'daterange', 'time'].includes(type) : false;
};
export var isOptionField = function (type) {
    return ['select', 'radio', 'checkbox', 'autocomplete'].includes(type);
};
export var getFieldValue = function (type, value) {
    var schema = type === 'date'
        ? 'YYYY-MM-DD'
        : type === 'datetime'
            ? 'YYYY-MM-DD HH:mm:ss'
            : type === 'time'
                ? 'HH:mm:ss'
                : 'YYYY-MM-DD';
    return isDateField(type) && value && typeof value === 'string' ? moment(value, schema) : value;
};
var saveOptions = function (field, state) {
    if (!(state && 'options' in field))
        return field;
    var updateKeys = Object.keys(state);
    var type = field.type, __options__ = field.__options__, value = field.value;
    if (typeof value === 'undefined' ||
        !isOptionField(type) ||
        !['value', '__options__'].some(function (key) { return updateKeys.includes(key); }))
        return field;
    // 存储option
    var option;
    // 多选
    if (Array.isArray(value)) {
        option = __options__ === null || __options__ === void 0 ? void 0 : __options__.filter(function (option) { return value.includes(option.value); });
    }
    else {
        option = __options__ === null || __options__ === void 0 ? void 0 : __options__.find(function (option) { return option.value === value; });
    }
    return immSetValues(field, {
        option: option,
    });
};
var createFormStore = function (props) {
    var name = props === null || props === void 0 ? void 0 : props.name;
    // 存储所有field状态
    var field$s = {};
    var unmount$ = new Subject();
    /** 触发提交 */
    var submitEvent$ = new Subject();
    /**
     * @description 收集field$
     * @param name
     * @param initial
     */
    var register = function (name, _initial) {
        var _a;
        if (field$s[name])
            return;
        /**
         * register plugins
         */
        var initial = plugins.register.call(_initial, formStore);
        var initialState = initial;
        if (Reflect.has(initial, 'initialValue')) {
            initialState = immSetValues(initial, {
                value: initial === null || initial === void 0 ? void 0 : initial.initialValue,
            });
        }
        // 初始化required rule
        var rules = getRules(typeof (initial === null || initial === void 0 ? void 0 : initial.required) === 'boolean' ? initial.required : false, initial === null || initial === void 0 ? void 0 : initial.validate, initial === null || initial === void 0 ? void 0 : initial.validateMsg, initial === null || initial === void 0 ? void 0 : initial.rules, initial === null || initial === void 0 ? void 0 : initial.requiredMsg);
        initialState = immSetValues(initialState, {
            rules: rules,
        });
        var field$ = new BehaviorSubject(initialState);
        Object.assign(field$s, (_a = {},
            _a[name] = field$,
            _a));
    };
    /**
     * @description 更新field$
     * @param name
     * @param updateState
     * @example dispatch(someName, {
     *  'options.params.a': {b: 1}
     * })
     */
    var dispatch = function (name, updateState, from) {
        var _a;
        var _b;
        // 这行代码位置不能动
        name && plugins.beforeDispatch.call(name, updateState, formStore);
        if (!name || !field$s[name]) {
            console.warn("".concat(field$s, "\u4E0D\u5B58\u5728").concat(name, "\u63A7\u4EF6"));
            return;
        }
        // 兼容回显日期数据
        if ('value' in updateState) {
            var type = field$s[name].getValue().type;
            updateState = immSetValues(updateState, {
                value: getFieldValue(type, updateState.value),
            });
        }
        var field$ = field$s[name];
        var prev = field$.getValue();
        var updateKeys = Object.keys(updateState);
        // 只检查修改的属性
        // 浅比较
        if (updateKeys.every(function (key) { return get(prev, key) === updateState[key]; }))
            return;
        var next = immSetValues(prev, updateState);
        // 存储__options__
        next = saveOptions(next, updateState);
        if (Reflect.has(updateState, 'required')) {
            var required = next.required;
            var rules = (_b = next.rules) !== null && _b !== void 0 ? _b : [];
            var requiredRuleIndex = rules === null || rules === void 0 ? void 0 : rules.findIndex(function (rule) { return Reflect.has(rule, 'required'); });
            if (requiredRuleIndex !== -1) {
                rules = immSetValues(rules, (_a = {},
                    _a[requiredRuleIndex] = {
                        required: required,
                    },
                    _a));
            }
            else {
                rules = update(rules, {
                    $push: [
                        {
                            required: required,
                            message: '不能为空',
                        },
                    ],
                });
            }
            next = immSetValues(next, {
                rules: rules,
            });
        }
        // 标记dispatch来源
        if (from) {
            next = immSetValues(next, {
                __from__: from,
            });
        }
        else {
            Reflect.deleteProperty(next, '__from__');
        }
        next = plugins.dispatch.call(next, formStore, updateState);
        field$.next(next);
        /** value或校验 变化触发校验， 可能存在异步校验 所以校验结果(error)需要单独dispatch */
        // 防止循环校验
        var isFromValidate = updateKeys.includes('error');
        // const shouldValidate = ['value', 'required', 'rules', 'validate', 'validateMsg'].some(key => updateKeys.includes(key));
        var shouldValidate = updateKeys.includes('value');
        if (shouldValidate && !isFromValidate) {
            validate(name, from);
        }
    };
    var remove = function (names) {
        var keys = Object.keys(field$s);
        if (typeof names === 'undefined') {
            names = keys;
        }
        else if (!Array.isArray(names)) {
            names = [names];
        }
        // 卸载标记
        unmount$.next(undefined);
        names.forEach(function (name) {
            console.assert(keys.includes(name), "form\u4E0D\u5B58\u5728".concat(name, "\u63A7\u4EF6"));
            // removeField$.next(name);
            var field$ = field$s[name];
            field$.complete();
            field$.unsubscribe();
            Reflect.deleteProperty(field$s, name);
        });
    };
    /**从field$s中选取field$ */
    var pick = function (names) {
        if (Array.isArray(names)) {
            var pickField$s = names.map(function (name) { return field$s[name]; });
            if (pickField$s.some(function (field$) { return !Boolean(field$); })) {
                console.warn("".concat(Object.keys(field$s), "\u4E0D\u5B58\u5728").concat(names, "\u5B57\u6BB5"));
            }
            return pickField$s.filter(Boolean);
        }
        if (!field$s[names]) {
            console.warn("".concat(Object.keys(field$s), "\u4E0D\u5B58\u5728").concat(names, "\u5B57\u6BB5"));
            return [];
        }
        return [field$s[names]];
    };
    function $(names, options) {
        if (typeof names === 'string') {
            if (!options)
                return field$s[names];
            return field$s[names].pipe(map(function (field) {
                var include = options.include, exclude = options.exclude;
                if (include) {
                    return lodashPick(field, include);
                }
                else if (exclude) {
                    return omit(field, exclude);
                }
                return field;
            }), distinctUntilChanged(function (prev, next) {
                var prevKeys = Object.keys(prev);
                var nextKeys = Object.keys(next);
                return (prevKeys.length === nextKeys.length && prevKeys.every(function (key) { return prev[key] === next[key]; }));
            }));
        }
        console.assert(Array.isArray(names));
        return combineLatest(names.map(function (name) { return $(name, options); })).pipe(takeUntil(unmount$));
    }
    var validate = function (names, from) {
        var allNames = Object.keys(field$s);
        names = Array.isArray(names) ? names : typeof names === 'undefined' ? allNames : [names];
        var activeNames = getActiveNames(names);
        return validateFields(activeNames, { field$s: field$s, dispatch: dispatch }, from);
    };
    /**过滤visible, submit为false的控件 */
    var getActiveNames = function (names) {
        return names.filter(function (name) {
            var field$ = field$s[name];
            if (!field$)
                return false;
            var _a = field$.getValue(), __visible__ = _a.__visible__, visible = _a.visible, submit = _a.submit;
            if (submit === true)
                return true;
            if (__visible__ === false || visible === false)
                return false;
            return true;
        });
    };
    var getErrors = function (names) {
        var allNames = Object.keys(field$s);
        names = Array.isArray(names) ? names : typeof names === 'undefined' ? allNames : [names];
        var activeNames = getActiveNames(names);
        var errors = activeNames.reduce(function (acc, name) {
            var _a;
            var state = field$s[name].getValue();
            if (state.error) {
                Object.assign(acc, (_a = {},
                    _a[name] = state.error,
                    _a));
            }
            return acc;
        }, {});
        return Object.values(errors).filter(Boolean).length ? errors : null;
    };
    /**获取控件value */
    var getValues = function (names) {
        var allNames = Object.keys(field$s);
        names = Array.isArray(names) ? names : typeof names === 'undefined' ? allNames : [names];
        var activeNames = getActiveNames(names);
        var values = activeNames.reduce(function (acc, name) {
            var _a;
            var fieldState = field$s[name].getValue();
            var pluginValue = plugins.getValue.call(fieldState.value, fieldState, formStore);
            Object.assign(acc, (_a = {},
                _a[name] = format(__assign(__assign({}, fieldState), { value: pluginValue })),
                _a));
            return acc;
        }, {});
        return values;
        // 提交前执行自定义逻辑，如返回false将阻止提交
        // return plugins.beforeSubmit.call(values, formStore);
    };
    // 提交状态
    var isSubmiting = false;
    var submit = function (callback) { return __awaiter(void 0, void 0, void 0, function () {
        var values, errors, result;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (isSubmiting)
                        return [2 /*return*/];
                    values = getValues();
                    values = plugins.beforeSubmit.call(values, formStore);
                    if (!values)
                        return [2 /*return*/];
                    // 执行校验
                    return [4 /*yield*/, validate().catch(function (err) { })];
                case 1:
                    // 执行校验
                    _a.sent();
                    errors = getErrors();
                    console.assert(typeof values === 'object', 'values必须是object类型');
                    if (typeof values !== 'object') {
                        return [2 /*return*/];
                    }
                    isSubmiting = true;
                    result = callback(errors, values);
                    if (typeof result === 'undefined') {
                        isSubmiting = false;
                    }
                    else if (result instanceof Promise) {
                        result
                            .then(function () {
                            isSubmiting = false;
                        })
                            .catch(function () {
                            isSubmiting = false;
                        });
                    }
                    return [2 /*return*/];
            }
        });
    }); };
    // setValues({
    //     a: 1,
    //     b: 2
    // })
    /**设置values */
    var setValues = function (values, from) {
        var keys = Object.keys(values);
        keys.forEach(function (key) {
            dispatch(key, {
                value: values[key],
            }, from);
        });
    };
    // 重置formStore状态
    var resetFields = function (_keys, from) {
        var keys = _keys !== null && _keys !== void 0 ? _keys : Object.keys(field$s);
        keys.forEach(function (key) {
            var initialValue = field$s[key].getValue().initialValue;
            dispatch(key, {
                value: initialValue,
                error: undefined,
            }, from);
        });
    };
    // 设置表单状态
    var setStatus = function (status) {
        if (status === void 0) { status = 'preview'; }
        var keys = Object.keys(field$s);
        keys.forEach(function (key) {
            var __visible__ = field$s[key].value.__visible__;
            if (__visible__ === false)
                return;
            dispatch(key, {
                displayAs: status,
                error: undefined,
            });
        });
    };
    /**internal plugins */
    var plugins = internalPluginsFactory();
    var formStore = {
        name: name,
        field$s: field$s,
        dispatch: dispatch,
        register: register,
        remove: remove,
        pick: pick,
        $: $,
        validate: validate,
        getValues: getValues,
        getErrors: getErrors,
        submit: submit,
        setValues: setValues,
        resetFields: resetFields,
        setStatus: setStatus,
        plugins: plugins,
        submitEvent$: submitEvent$,
    };
    return formStore;
};
// export declare type FormStore = {
// 	// form name
// 	name?: string;
// 	// 控件数据
// 	field$s: IField$s;
// 	// 注册控件
// 	register: (name: string, _initial: IField) => void;
// 	// 修改数据
// 	dispatch: (
// 		name: string | undefined,
// 		updateState: Partial<IField> & { [x: string]: any },
// 		from?: string
// 	) => void;
// 	// 移除控件
// 	remove: (names?: string | string[]) => void;
// 	pick: (names: string | string[]) => IField$[];
// 	// 选择一个或多个控件
// 	$: <T extends string | string[]>(
// 		name: T,
// 		options?: FieldSelectOptions
// 	) => T extends Array<string> ? Observable<IField[]> : BehaviorSubject<IField>;
// 	// 校验
// 	validate: (names?: string | string[], from?: string) => void;
// 	// 获取错误信息
// 	getErrors: (names?: string | string[]) => { [name: string]: string } | null;
// 	// 获取值
// 	getValues: (names?: string | string[]) => { [name: string]: any };
// 	// 提交
// 	submit: (
// 		submition: (
// 			errors: { [name: string]: string } | null,
// 			values: { [name: string]: any }
// 		) => void | Promise<unknown>
// 	) => void;
// 	// 批量设置控件值
// 	setValues: (values: Values, from?: string) => void;
// 	// 清除控件值和状态
// 	resetFields: (_keys?: string[], from?: string) => void;
// 	// 设置表单状态'disabled' | 'preview' | 'edit'
// 	setStatus: (status: IField['displayAs']) => void;
// 	// 表单局部plugins
// 	plugins: ReturnType<typeof internalPluginsFactory>;
// 	childFormStoresRefs?: React.MutableRefObject<FormStore[]>[];
// };
export var FormContext = React.createContext({});
export var SchemaContext = React.createContext({});
export default createFormStore;
//# sourceMappingURL=createFormStore.js.map