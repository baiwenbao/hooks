var getValidators = function (validates) {
    return validates.map(function (item) {
        var _a = item.split(':'), type = _a[0], type_values = _a[1];
        return {
            type: type,
            type_values: type_values,
        };
    });
};
var isNullValue = function (value) { return typeof value === 'undefined' || value === '' || value === null; };
// required: false validate:[{type:int}, {type:long}, {type:length, type_values: -,5}]
// validateMsg: '不能为空,请填写数字,数字格式不对,字符串长度小于5'
var getRules = function (required, validate, validateMsg, initialRules, requiredMsg) {
    if (required === void 0) { required = false; }
    if (validate === void 0) { validate = ''; }
    if (validateMsg === void 0) { validateMsg = '校验失败'; }
    if (initialRules === void 0) { initialRules = []; }
    if (required === true) {
        initialRules.push({
            required: true,
            message: requiredMsg || '不能为空',
        });
    }
    if (!validate)
        return initialRules;
    var ruleObjArr = getValidators(validate.split('###'));
    var validateMsgArr = validateMsg.split(','); // 假设多个errorMsg以逗号隔开
    var rules = initialRules;
    ruleObjArr.forEach(function (item, index) {
        var _a;
        var type = item.type, type_values = item.type_values;
        var errMsg = (_a = validateMsgArr === null || validateMsgArr === void 0 ? void 0 : validateMsgArr[index]) !== null && _a !== void 0 ? _a : validateMsg;
        switch (type) {
            case 'match':
                if (type_values === 'number') {
                    rules.push({
                        validator: function (rule, value) {
                            if (isNullValue(value))
                                return Promise.resolve();
                            if (!Number.isNaN(Number(value))) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(errMsg);
                            }
                        },
                        message: '必选为数字类型',
                    });
                }
                else if (type_values === 'int') {
                    rules.push({
                        type: 'integer',
                        transform: function (value) {
                            if (isNullValue(value))
                                return true;
                            return Number(value);
                        },
                        message: errMsg,
                    });
                }
                else if (type_values === 'posint') {
                    rules.push({
                        type: 'integer',
                        min: 1,
                        transform: function (value) {
                            if (isNullValue(value))
                                return true;
                            return Number(value);
                        },
                        message: errMsg,
                    });
                }
                else if (type_values === 'long') {
                    rules.push({
                        validator: function (rule, value) {
                            if (isNullValue(value))
                                return Promise.resolve();
                            var val = Number(value);
                            if (val >= -9223372036854775808 && val <= 9223372036854775807) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(errMsg);
                            }
                        },
                        message: errMsg,
                    });
                }
                else if (type_values === 'double') {
                    rules.push({
                        validator: function (rule, value) {
                            if (isNullValue(value))
                                return Promise.resolve();
                            var val = Number(value);
                            if (val >= -4.9e-324 && val <= 1.7976931348623157e308) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(errMsg);
                            }
                        },
                        message: errMsg,
                    });
                }
                else if (type_values === 'date') {
                    // yyyy-MM-DD
                    rules.push({
                        validator: function (rule, value) {
                            if (isNullValue(value))
                                return Promise.resolve();
                            if (eval('/^(?:(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8])))))$|^(?:((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29))$/').test(value)) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(errMsg);
                            }
                        },
                        message: errMsg,
                    });
                }
                else if (type_values === 'timestamp') {
                    // yyyy-MM-DD HH:mm:ss ?
                    rules.push({
                        validator: function (rule, value) {
                            if (isNullValue(value))
                                return Promise.resolve();
                            if (eval('/^(((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|((01[0-9]{2}|0[2-9][0-9]{2}|[1-9][0-9]{3})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((04|08|12|16|[2468][048]|[3579][26])00))-0?2-29)) (20|21|22|23|[0-1]?\\d):[0-5][0-9]:[0-5][0-9]$/').test(value)) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(errMsg);
                            }
                        },
                        message: errMsg,
                    });
                }
                else if (type_values === 'email') {
                    rules.push({
                        type: 'email',
                        message: errMsg,
                    });
                }
                else {
                    rules.push({
                        validator: function (rule, value) {
                            if (isNullValue(value))
                                return Promise.resolve();
                            if (new RegExp(type_values).test(value)) {
                                return Promise.resolve();
                            }
                            else {
                                return Promise.reject(errMsg);
                            }
                        },
                        message: errMsg,
                    });
                }
                break;
            case 'values':
                rules.push({
                    type: 'enum',
                    enum: type_values.split(','),
                    message: errMsg,
                });
                break;
            case 'length':
                var _b = type_values.split(','), min = _b[0], max = _b[1];
                var minLen_1 = min === '-' ? undefined : Number(min);
                var maxLen_1 = max === '-' ? undefined : Number(max);
                rules.push({
                    transform: function (value) {
                        if (isNullValue(value))
                            return value;
                        if (Array.isArray(value))
                            return value;
                        return String(value);
                    },
                    validator: function (rule, value) {
                        if (isNullValue(value))
                            return Promise.resolve();
                        var isInRange = (typeof minLen_1 === 'undefined' || value.length >= minLen_1) &&
                            (typeof maxLen_1 === 'undefined' || value.length <= maxLen_1);
                        if (isInRange) {
                            return Promise.resolve();
                        }
                        else {
                            return Promise.reject(errMsg);
                        }
                    },
                    message: errMsg,
                });
                break;
            case 'nrange':
                var _c = type_values.split(','), min = _c[0], max = _c[1];
                var minNum_1 = min === '-' ? undefined : parseFloat(min);
                var maxNum_1 = max === '-' ? undefined : parseFloat(max);
                rules.push({
                    transform: function (value) {
                        if (isNullValue(value))
                            return value;
                        return Number(value);
                    },
                    validator: function (rule, value) {
                        if (isNullValue(value))
                            return Promise.resolve();
                        var isInRange = (typeof minNum_1 === 'undefined' || value >= minNum_1) &&
                            (typeof maxNum_1 === 'undefined' || value <= maxNum_1);
                        if (isInRange) {
                            return Promise.resolve();
                        }
                        else {
                            return Promise.reject(errMsg);
                        }
                    },
                    message: errMsg,
                });
                break;
        }
    });
    return rules;
};
export default getRules;
//# sourceMappingURL=rules.js.map