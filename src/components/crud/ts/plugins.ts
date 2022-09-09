import { ColumnProps } from 'antd/lib/table';
import { SyncWaterfallHook } from 'tapable';

const pluginsFactory = <T = any>() => ({
  tableColumns: new SyncWaterfallHook<[ColumnProps<T>[]]>(['columns']),
});

export default pluginsFactory;
