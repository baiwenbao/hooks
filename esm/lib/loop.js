var loop = function (target, effect, parentPath) {
    if (parentPath === void 0) { parentPath = ''; }
    if (typeof target === 'object' && target !== null) {
        if (Array.isArray(target)) {
            target.forEach(function (item, index) {
                var path = parentPath ? "".concat(parentPath, ".").concat(index) : String(index);
                loop(item, effect, path);
            });
        }
        else {
            Object.keys(target).forEach(function (key) {
                var path = parentPath ? "".concat(parentPath, ".").concat(key) : key;
                var item = target[key];
                loop(item, effect, path);
            });
        }
    }
    else {
        effect === null || effect === void 0 ? void 0 : effect(parentPath, target);
    }
};
export default loop;
//# sourceMappingURL=loop.js.map