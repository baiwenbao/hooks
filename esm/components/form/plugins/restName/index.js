/**
 * @description 字段名解构
 * @example {
 *     name: 'start,end',
 *     type: 'daterange',
 *     initialValue: ['2020-1-1', '2020-2-3']
 * }
 */
import { __assign } from "tslib";
import plugins from '../../ts/hooks';
plugins.register.tap('rest name', function (field, formStore) {
    var name = field.name, initialValue = field.initialValue, format = field.format, props = field.props, submit = field.submit;
    var isRestName = name === null || name === void 0 ? void 0 : name.includes(',');
    if (!isRestName)
        return field;
    var names = name === null || name === void 0 ? void 0 : name.split(',');
    var register = formStore.register;
    var initialValues = initialValue;
    names === null || names === void 0 ? void 0 : names.forEach(function (name, index) {
        // @ts-ignore
        register(name, {
            initialValue: initialValues === null || initialValues === void 0 ? void 0 : initialValues[index],
            format: format,
            props: props,
            name: name
        });
    });
    return __assign(__assign({}, field), { submit: submit !== null && submit !== void 0 ? submit : false });
});
plugins.dispatch.tap('rest name', function (field, formStore) {
    var name = field.name, value = field.value;
    var isRestName = name === null || name === void 0 ? void 0 : name.includes(',');
    if (!isRestName)
        return field;
    var names = name === null || name === void 0 ? void 0 : name.split(',');
    var dispatch = formStore.dispatch;
    names === null || names === void 0 ? void 0 : names.forEach(function (name, index) {
        var _a;
        dispatch(name, {
            value: (_a = value) === null || _a === void 0 ? void 0 : _a[index]
        });
    });
    return field;
});
//# sourceMappingURL=index.js.map