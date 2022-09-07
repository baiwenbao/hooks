import { ColumnProps } from 'antd/lib/table';
import { SyncWaterfallHook } from 'tapable';
declare const pluginsFactory: <T = any>() => {
    tableColumns: SyncWaterfallHook<[ColumnProps<T>[]], import("tapable").UnsetAdditionalOptions>;
};
export default pluginsFactory;
