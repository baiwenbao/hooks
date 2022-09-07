import { SyncWaterfallHook } from 'tapable';
var pluginsFactory = function () { return ({
    tableColumns: new SyncWaterfallHook(['columns'])
}); };
export default pluginsFactory;
//# sourceMappingURL=plugins.js.map