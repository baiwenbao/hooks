import { SyncWaterfallHook } from 'tapable';
import { AppProps } from '../index';
// import './type';

const pluginsFactory = () => {
  return {
    transformConf: new SyncWaterfallHook<Omit<AppProps, 'appContextValue'>>(['conf']),
  };
};

export const plugins = pluginsFactory();

export declare type IPlugins = ReturnType<typeof pluginsFactory>;

export const internalPluginsFactory = () => {
  const internalPlugins = pluginsFactory();

  const keys = Object.keys(plugins) as Array<keyof IPlugins>;
  keys.forEach((key) => {
    internalPlugins[key].tap('run global plugin', (...args: any[]): any => {
      // @ts-ignore
      return plugins[key].call(...args);
    });
  });

  return internalPlugins;
};
