import { BehaviorSubject, Subject } from 'rxjs';
import { SyncWaterfallHook, SyncHook } from 'tapable';
import { IField, Value, Values } from '../type/field';
import { IForm } from '../type/form';
import { IFormItem } from '../type/formitem';
import { FormStore } from './createFormStore';

export type CustomFieldProps = {
  fieldState: IField;
  formStore: FormStore;
  internalValue$: BehaviorSubject<Value>;
  internalValue: Value;
  blur$: Subject<undefined>;
  change$: Subject<undefined>;
};

/**form配置插件 */
const pluginsFactory = <T extends FormStore>() => {
  return {
    /**自定义field */
    field: new SyncWaterfallHook<[CustomFieldProps], JSX.Element>(['customFieldProps']),
    /**自定义format */
    format: new SyncWaterfallHook<[Value]>(['value']),
    /**配置预处理 */
    loadConfig: new SyncWaterfallHook<[IForm]>(['formConfig']),
    /** form初始化 */
    initFormStore: new SyncHook<[T, IForm]>(['formStore', 'formConfig']),
    register: new SyncWaterfallHook<[IField, FormStore]>(['field', 'formStore']),
    /**dispatch中处理 */
    beforeDispatch: new SyncHook<[string, Partial<IField>, FormStore]>([
      'name',
      'updateState',
      'formStore',
    ]),
    /**dispatch中处理 */
    dispatch: new SyncWaterfallHook<[IField, FormStore, Partial<IField>]>([
      'field',
      'formStore',
      'updateState',
    ]),
    /**控件mounted */
    fieldMounted: new SyncHook<[IField, FormStore]>(['field', 'formStore']),
    /**formItem mounted */
    formItemMounted: new SyncHook<[IFormItem, FormStore]>(['formItem', 'formStore']),
    getValue: new SyncWaterfallHook<[Value, IField, FormStore]>([
      'value',
      'fieldState',
      'formStore',
    ]),
    /**提交前执行自定义逻辑，如返回false将阻止提交 */
    beforeSubmit: new SyncWaterfallHook<[Values | false, FormStore]>(['values', 'formStore']),
    /**提交后处理 */
    submit: new SyncHook<[Values, FormStore]>(['values', 'formStore']),
    blur: new SyncHook<[IField, FormStore]>(['fieldState', 'formStore']),
  };
};

// 全局form plugins，可以根据name和location.url区分过滤
const plugins = pluginsFactory();

const pluginNames = Object.keys(plugins) as Array<keyof typeof plugins>;
// 阻止相同的tap name注册
pluginNames.forEach((pluginName) => {
  const rawTap = plugins[pluginName].tap;
  plugins[pluginName].tap = (...args: Parameters<typeof rawTap>) => {
    const [name, fn] = args;
    const { taps } = plugins[pluginName];
    if (taps.some((tap) => tap.name === name)) {
      console.warn(`tap name '${name}' 重复`);
      return;
    }
    // @ts-ignore
    return rawTap.call(plugins[pluginName], name, fn);
  };
});

export declare type FormPlugins = ReturnType<typeof pluginsFactory>;

export const internalPluginsFactory = () => {
  const internalPlugins = pluginsFactory();

  const keys = Object.keys(plugins) as Array<keyof FormPlugins>;
  keys.forEach((key) => {
    internalPlugins[key].tap('run global plugin', (...args: any[]): any => {
      return plugins[key].call(...args);
    });
  });

  return internalPlugins;
};

export default plugins;
