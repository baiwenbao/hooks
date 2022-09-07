import { SyncWaterfallHook } from 'tapable';
import { AppProps } from '../index';
declare const pluginsFactory: () => {
    transformConf: SyncWaterfallHook<Omit<AppProps, "appContextValue">, import("tapable").UnsetAdditionalOptions>;
};
export declare const plugins: {
    transformConf: SyncWaterfallHook<Omit<AppProps, "appContextValue">, import("tapable").UnsetAdditionalOptions>;
};
export declare type IPlugins = ReturnType<typeof pluginsFactory>;
export declare const internalPluginsFactory: () => {
    transformConf: SyncWaterfallHook<Omit<AppProps, "appContextValue">, import("tapable").UnsetAdditionalOptions>;
};
export {};
