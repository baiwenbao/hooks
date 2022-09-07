import { SyncWaterfallHook, SyncHook } from 'tapable';
/**form配置插件 */
var pluginsFactory = function () {
    return {
        /**自定义field */
        field: new SyncWaterfallHook(['customFieldProps']),
        /**自定义format */
        format: new SyncWaterfallHook(['value']),
        /**配置预处理 */
        loadConfig: new SyncWaterfallHook(['formConfig']),
        /** form初始化 */
        initFormStore: new SyncHook(['formStore', 'formConfig']),
        register: new SyncWaterfallHook(['field', 'formStore']),
        /**dispatch中处理 */
        beforeDispatch: new SyncHook([
            'name',
            'updateState',
            'formStore',
        ]),
        /**dispatch中处理 */
        dispatch: new SyncWaterfallHook([
            'field',
            'formStore',
            'updateState',
        ]),
        /**控件mounted */
        fieldMounted: new SyncHook(['field', 'formStore']),
        /**formItem mounted */
        formItemMounted: new SyncHook(['formItem', 'formStore']),
        getValue: new SyncWaterfallHook([
            'value',
            'fieldState',
            'formStore',
        ]),
        /**提交前执行自定义逻辑，如返回false将阻止提交 */
        beforeSubmit: new SyncWaterfallHook(['values', 'formStore']),
        /**提交后处理 */
        submit: new SyncHook(['values', 'formStore']),
        blur: new SyncHook(['fieldState', 'formStore']),
    };
};
// 全局form plugins，可以根据name和location.url区分过滤
var plugins = pluginsFactory();
var pluginNames = Object.keys(plugins);
// 阻止相同的tap name注册
pluginNames.forEach(function (pluginName) {
    var rawTap = plugins[pluginName].tap;
    plugins[pluginName].tap = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var name = args[0], fn = args[1];
        var taps = plugins[pluginName].taps;
        if (taps.some(function (tap) { return tap.name === name; })) {
            console.warn("tap name '".concat(name, "' \u91CD\u590D"));
            return;
        }
        // @ts-ignore
        return rawTap.call(plugins[pluginName], name, fn);
    };
});
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
            return (_a = plugins[key]).call.apply(_a, args);
        });
    });
    return internalPlugins;
};
export default plugins;
//# sourceMappingURL=hooks.js.map