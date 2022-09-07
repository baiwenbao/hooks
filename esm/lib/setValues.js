import update from 'immutability-helper';
/**
 * @example setValues({a: {b: {c: 1}}}, {'a.b.c': 2})
 */
var setValues = function (target, values) {
    var next = target;
    var keys = Object.keys(values);
    keys.forEach(function (path) {
        // 将{'options.params.a': newValue}转换成{options: {params: {a: {$set: newValue}}}}
        var newValue = values[path];
        var keys = path.split('.');
        var action = keys.reduceRight(function (acc, key) {
            var _a;
            return _a = {},
                _a[key] = acc,
                _a;
        }, { $set: newValue });
        next = update(next, action);
    });
    return next;
};
export default setValues;
var push = function (target, path, value) {
    var keys = path.split('.');
    var action = keys.reduceRight(function (acc, key) {
        var _a;
        return _a = {},
            _a[key] = acc,
            _a;
    }, { $push: value });
    return update(target, action);
};
//# sourceMappingURL=setValues.js.map