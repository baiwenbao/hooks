import Schema from 'async-validator';
export var validateFields = function (fieldNames, formStore, from) {
    var allRules = {};
    var allValues = {};
    var field$s = formStore.field$s, dispatch = formStore.dispatch;
    fieldNames.forEach(function (fieldName) {
        var _a, _b;
        var field$ = field$s[fieldName];
        var state = field$.getValue();
        var rules = state.rules;
        if (rules && rules.length > 0) {
            Object.assign(allValues, (_a = {},
                _a[fieldName] = state.value,
                _a));
            Object.assign(allRules, (_b = {},
                _b[fieldName] = rules,
                _b));
        }
    });
    var validator = new Schema(allRules);
    // {first: true} 遇到第一个错误 则终止校验
    return validator.validate(allValues, {
        first: false,
        firstFields: true,
    }, function (errors) {
        if (errors) {
            errors.forEach(function (error) {
                dispatch(error.field, {
                    error: error,
                }, from);
            });
        }
        else {
            fieldNames.forEach(function (fieldName) {
                if (typeof field$s[fieldName].getValue().error === 'undefined')
                    return;
                dispatch(fieldName, {
                    error: undefined,
                }, from);
            });
        }
        // callback && callback(errors);
    });
};
//# sourceMappingURL=validate.js.map