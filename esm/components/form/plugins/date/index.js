import { __assign } from "tslib";
import plugins from '../../ts/hooks';
import { isDateField } from '../../ts/createFormStore';
import moment, { isMoment } from 'moment';
/**
 * @description 预处理日期控件initialValue
 */
var getInitialValue = function (field) {
    var name = field.name, initialValue = field.initialValue, type = field.type, format = field.format;
    if (typeof initialValue === 'undefined')
        return initialValue;
    if (isMoment(initialValue))
        return initialValue;
    //  !initialValue.every(item => isMoment(item))
    if (Array.isArray(initialValue)) {
        // [-7, 7]当前日期的前后七天范围
        if (initialValue.every(function (item) { return typeof item === 'number'; })) {
            var start = initialValue[0], end = initialValue[1];
            return [moment().add(start, 'days'), moment().add(end, 'days')];
        }
        else if (initialValue.every(function (item) { return typeof item === 'string'; })) {
            return initialValue.map(function (item) { return moment(item); });
        }
        else {
            return initialValue;
        }
    }
    if (initialValue === 'now')
        return moment();
    console.assert(typeof initialValue === 'string', "".concat(name, " initialValue\u5E94\u8BE5\u662Fstring\u7C7B\u578B"));
    var schema = type === 'date'
        ? 'YYYY-MM-DD'
        : type === 'datetime'
            ? 'YYYY-MM-DD HH:mm:ss'
            : type === 'time'
                ? 'HH:mm:ss'
                : 'YYYY-MM-DD';
    return moment(initialValue, schema);
};
/**
 * @description
 * 预处理日期控件initialValue: 'now'
 * initialValue: [-7, 7]  当前日期的前后七天范围
 */
plugins.register.tap('preset date field', function (field) {
    if (!field)
        return field;
    var type = field.type;
    // 非date控件
    if (!isDateField(type))
        return field;
    return __assign(__assign({}, field), { initialValue: getInitialValue(field) });
});
//# sourceMappingURL=index.js.map