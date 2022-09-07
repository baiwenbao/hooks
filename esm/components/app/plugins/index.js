import { SyncWaterfallHook } from 'tapable';
// import './type';
var pluginsFactory = function () {
    return {
        transformConf: new SyncWaterfallHook([
            'conf'
        ])
    };
};
export var plugins = pluginsFactory();
export var internalPluginsFactory = function () {
    var internalPlugins = pluginsFactory();
    var keys = Object.keys(plugins);
    keys.forEach(function (key) {
        internalPlugins[key].tap('run global plugin', function () {
            var _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            // @ts-ignore
            return (_a = plugins[key]).call.apply(_a, args);
        });
    });
    return internalPlugins;
};
//# sourceMappingURL=index.js.map