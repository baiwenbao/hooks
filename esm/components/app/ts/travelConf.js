import { BehaviorSubject } from 'rxjs';
export var travelConf = function (target, rootCom$s) {
    var com$s = rootCom$s !== null && rootCom$s !== void 0 ? rootCom$s : {};
    var fib = function (com) {
        var _a;
        var id = com.id, data = com.data, children = com.children;
        if (typeof id !== 'undefined') {
            console.assert(!Reflect.has(com$s, id), "id: ".concat(id, "\u91CD\u590D"));
            Object.assign(com$s, (_a = {},
                _a[id] = new BehaviorSubject(data),
                _a));
        }
        if (children && typeof children === 'object') {
            if (Array.isArray(children)) {
                children.forEach(function (child) {
                    fib(child);
                });
            }
            else {
                fib(children);
            }
        }
    };
    fib(target);
    return com$s;
};
//# sourceMappingURL=travelConf.js.map