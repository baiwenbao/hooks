import { isMoment } from 'moment';
import format from '../../../lib/format';
var fieldValueFormat = function (field) {
    var formatter = field.format, value = field.value, type = field.type;
    if (typeof value === 'undefined') {
        return value;
    }
    else if (isMoment(value)) {
        var schema = type === 'date'
            ? 'YYYY-MM-DD'
            : type === 'datetime'
                ? 'YYYY-MM-DD HH:mm:ss'
                : type === 'time'
                    ? 'HH:mm:ss'
                    : 'YYYY-MM-DD';
        if (formatter) {
            return format(value, formatter);
        }
        return value.format(schema);
    }
    else if (type === 'daterange') {
        return value.map(function (item) {
            return format(item, formatter);
        });
    }
    else if (!formatter) {
        return value;
    }
    else {
        return format(value, formatter);
    }
};
export default fieldValueFormat;
//# sourceMappingURL=format.js.map