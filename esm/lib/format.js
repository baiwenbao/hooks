import moment from 'moment';
import compose from 'lodash/fp/compose';
import { format as mathFormat } from 'mathjs';
export var Formatter;
(function (Formatter) {
    Formatter[Formatter["yuan"] = 1] = "yuan";
    Formatter[Formatter["fen"] = 2] = "fen";
    Formatter[Formatter["percent"] = 3] = "percent";
    Formatter[Formatter["thousands"] = 4] = "thousands";
    Formatter[Formatter["float"] = 5] = "float";
    Formatter[Formatter["time"] = 6] = "time";
})(Formatter || (Formatter = {}));
var isNumber = function (value) {
    return !Number.isNaN(Number(value));
};
// 浮点数运算精度
var calc = function (value) {
    var _a;
    return ((_a = (isNumber(value) && mathFormat(Number(value), { precision: 14 }))) !== null && _a !== void 0 ? _a : value);
};
var yuan = function (value) {
    return calc(Number(value) / 100);
};
var fen = function (value) {
    return calc(Number(value) * 100);
};
var percent = function (value) {
    return calc(Number(value) * 100) + '%';
};
var thousands = function (value) {
    return Number(value).toLocaleString();
};
var float = function (precision) { return function (value) {
    return parseFloat(Number(value).toFixed(precision));
}; };
var getFormatFn = function (formatter) {
    switch (formatter) {
        case 'yuan':
            return yuan;
        case 'fen':
            return fen;
        case 'percent':
            return percent;
        case 'thousands':
            return thousands;
        default:
            // float 和 自定义
            if (formatter.startsWith('float')) {
                var _a = formatter.split('|'), len = _a[1];
                return float(Number(len));
            }
            else if (formatter.startsWith('time')) {
                var _b = formatter.split('|'), timeSchema_1 = _b[1];
                return function (value) { return moment(value).format(timeSchema_1); };
            }
            else {
                return new Function('value', "return ".concat(formatter));
            }
    }
};
// formatters: ['fen', 'float|2', 'value + 1']
var composed = function (value, formatters) {
    var fns = Array.isArray(formatters)
        ? formatters.map(function (formatter) { return getFormatFn(formatter); })
        : [getFormatFn(formatters)];
    //@ts-ignore
    return compose(fns)(value);
};
var format = function (value, formatter) {
    if (typeof value === 'undefined' || !formatter)
        return value;
    return composed(value, formatter);
};
export default format;
//# sourceMappingURL=format.js.map