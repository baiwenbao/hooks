import { default as immSetValues } from '../../../../lib/setValues';
import plugins from '../../ts/hooks';
/**
 * @description 字段组合
 * @example [{
 *     name: 'groups@title',
 * }, {
 *     name: 'groups@fieldNames'
 * }]
 */
var connector = '@';
plugins.beforeDispatch.tap('set combined', function (name, state, formStore) {
    var value = state.value;
    var dispatch = formStore.dispatch, field$s = formStore.field$s;
    if (typeof value === 'object' && value && !Array.isArray(value) && !field$s[name]) {
        var keys = Object.keys(value);
        keys.forEach(function (key) {
            var _name = "".concat(name).concat(connector).concat(key);
            field$s[_name] &&
                dispatch(_name, {
                    value: value[key]
                });
        });
    }
});
plugins.dispatch.tap('tags select', function (state) {
    var _a;
    var type = state.type, props = state.props, value = state.value;
    if (type === 'select' &&
        ((_a = props) === null || _a === void 0 ? void 0 : _a.mode) === 'tags' &&
        typeof value === 'string') {
        return immSetValues(state, {
            value: value.split(',')
        });
    }
    return state;
});
plugins.beforeSubmit.tap('combine name', function (values) {
    if (typeof values === 'boolean')
        return values;
    var keys = Object.keys(values);
    return keys.reduce(function (acc, key) {
        var _a, _b, _c, _d;
        var isCombineName = key.includes(connector);
        var value = values[key];
        if (typeof value === 'undefined')
            return acc;
        if (!isCombineName) {
            return Object.assign(acc, (_a = {},
                _a[key] = value,
                _a));
        }
        var _e = key.split(connector), parent = _e[0], property = _e[1];
        if (acc[parent]) {
            Object.assign(acc[parent], (_b = {},
                _b[property] = value,
                _b));
        }
        else {
            Object.assign(acc, (_c = {},
                _c[parent] = (_d = {},
                    _d[property] = value,
                    _d),
                _c));
        }
        return acc;
    }, {});
});
//# sourceMappingURL=index.js.map