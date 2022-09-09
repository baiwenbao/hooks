// @ts-nocheck

import React, {
  useContext,
  useMemo,
  useRef,
  useEffect,
  createContext,
  useCallback,
  ReactNode,
} from 'react';
import createFormStore, { FormContext, FormStore, SchemaContext } from '../ts/createFormStore';
import { ColumnProps } from 'antd/lib/table';
import { Table, Tooltip, Typography } from 'antd';
import { IForm } from '../type/form';
import FormItem from './formitem';
import uniqueId from 'lodash/uniqueId';
import omit from 'lodash/omit';
import useFormTable, { GetTableData } from '../../table';
import useUnmount from '../../../lib/useUnmount';
import { takeUntil, skip } from 'rxjs/operators';
import { merge } from 'rxjs';
import update from 'immutability-helper';
import { Mutate, PaginatedFormatReturn } from '@umijs/use-request/lib/types';
import format from '../ts/format';
// @ts-ignore
// import styles from '../index.module.scss';

const { Text } = Typography;

export declare type TableFormProps<T> = {
  // columns: ColumnProps<T>[]
  formConfig: IForm;
  /**获取接口数据 */
  getData: GetTableData<T & { uid: string }>;
  /**操作列按钮 */
  actions?: (record: T & { uid: string }, index: number) => ReactNode;
  effect?: (formStore: FormStore, record: any) => void;
  tableProps?: {
    pagination: boolean;
  };
};

declare type ItemData = {
  [x: string]: unknown;
};

const TableContext = createContext<
  | {
      formsRef: { current: FormStore[] };
      setDataSource: Mutate<PaginatedFormatReturn<ItemData & { uid: string }>>;
      formConfig: IForm;
      effect: (formStore: FormStore, record: any) => void;
      dataSource: any[];
    }
  | undefined
>(undefined);

const TableRow = ({
  index,
  ...props
}: {
  index: number;
  'data-row-key': string;
  // formConfig: IForm;
  // record: any;
  // effect?: (formStore: FormStore, record: any) => void;
}) => {
  const uid = props['data-row-key'];
  const { formConfig, effect, dataSource } = useContext(TableContext)!;
  const record = dataSource.find((item) => item.uid == uid);
  const { name } = formConfig;
  const formStore = useMemo(() => createFormStore({ name }), []);
  const { formsRef, setDataSource } = useContext(TableContext)!;
  const unmount$ = useUnmount();

  useEffect(() => {
    const { field$s, pick } = formStore;
    const { current: formStores } = formsRef;
    formStores.push(formStore);
    const names = Object.keys(field$s);

    effect?.(formStore, record);

    // 用户修改控件值同步到dataSource
    merge(...pick(names))
      .pipe(
        takeUntil(unmount$),
        skip(names.length), // 忽略初始化渲染的undefined值
      )
      .subscribe((state) => {
        const { name } = state;
        setDataSource((data) => {
          const index = data.list.findIndex((item) => item.uid === record.uid);

          return update(data, {
            list: {
              [index]: {
                [name!]: {
                  $set: format(state),
                },
              },
            },
          });
        });
      });

    // dataSource中的数据回显到控件
    formStore.setValues(omit(record, 'uid'));

    return () => {
      formStore.remove();
    };
  }, []);

  const formContextRef = useRef({
    formStore,
  });

  const schemaContextValue = useMemo(
    () => ({
      schema: formConfig,
    }),
    [formConfig],
  );

  return useMemo(
    () => (
      <FormContext.Provider value={formContextRef.current}>
        <SchemaContext.Provider value={schemaContextValue}>
          <tr {...props} />
        </SchemaContext.Provider>
      </FormContext.Provider>
    ),
    [],
  );
};

const TableCell = (props: { index: number; formConfig: IForm; children: ReactNode }) => {
  const { index, formConfig } = props;
  const formItems = formConfig?.formItems;
  const formItemProps = omit(formItems?.[index], 'extra');
  const formItemNode = useMemo(
    () => <td>{formItems ? <FormItem formItem={formItemProps} /> : props.children}</td>,
    [],
  );

  return formItemNode;
};

const components = {
  body: {
    row: TableRow,
    cell: TableCell,
  },
};

const useTableForm = <T extends ItemData = ItemData>(props: TableFormProps<T>) => {
  const { getData, formConfig, actions, effect, tableProps: _tableProps } = props;
  const formsRef = useRef<FormStore[]>([]);
  const { formItems } = formConfig;
  const { tableProps, mutate } = useFormTable(getData);

  // 初始化数据增加uid
  tableProps.dataSource?.forEach((item) => {
    if (!item.uid) {
      Object.assign(item, {
        uid: uniqueId(),
      });
    }
  });

  const columns: ColumnProps<T>[] = formItems!.map((col, index) => {
    const { label, labelTip, field: fields, extra } = col;
    const [field] = Array.isArray(fields) ? fields : [fields];
    const { name, required } = field;

    const tipProps =
      labelTip && typeof labelTip === 'object' && 'title' in labelTip
        ? labelTip
        : {
            title: labelTip,
          };

    return {
      title: (
        <>
          <Tooltip {...tipProps}>{label}</Tooltip>
          {required ? <span style={{ color: 'red' }}>*</span> : ''}
          <Text strong={false} style={{ fontSize: 12 }}>
            {extra ? `(${extra})` : ''}
          </Text>
        </>
      ),
      dataIndex: name,
      onCell: (record: T) =>
        ({
          record,
          formConfig,
          // dataIndex: col.dataIndex,
          // title: col.title,
          index,
        } as any),
    };
  });

  actions &&
    columns.push({
      title: '操作',
      render(_, record, index) {
        return <>{actions(record as T & { uid: string }, index)}</>;
      },
    });

  const add = useCallback(
    (items: Partial<T>[] = [{}]) => {
      mutate((data) => {
        return update(data, {
          list: {
            $push: items.map((item) => ({
              ...item,
              uid: uniqueId(),
            })) as (T & { uid: string })[],
          },
        });
      });
    },
    [mutate],
  );

  const remove = useCallback(
    (uid: string) => {
      mutate((data) => {
        const index = data.list.findIndex((item) => item.uid === uid);
        formsRef.current.splice(index, 1);

        return update(data, {
          list: {
            $splice: [[index, 1]],
          },
        });
      });
    },
    [mutate],
  );

  const move = useCallback(
    (uid: string, pos: number) => {
      mutate((data) => {
        const { list } = data;
        const curIndex = list!.findIndex((item) => item.uid === uid);
        const index = curIndex + pos;
        if (index < 0 || index > list.length - 1) return data;
        // 调换位置
        [list[curIndex], list[index]] = [list[index], list[curIndex]];
        [formsRef.current[curIndex], formsRef.current[index]] = [
          formsRef.current[index],
          formsRef.current[curIndex],
        ];
        return update(data, {
          list: {
            $set: [...list],
          },
        });
      });
    },
    [mutate],
  );

  const submit = (fn?: (err: any, values: T[] | undefined) => void) => {
    const { current: formStores } = formsRef;

    const errors = formStores
      .map((formStore) => {
        formStore.validate();
        return formStore.getErrors();
      })
      .filter(Boolean);

    // if (errors.some(error => !!error)) return;
    fn &&
      fn(
        errors,
        tableProps.dataSource
          ?.map((item) => omit<T, 'uid'>(item, 'uid') as T)
          .filter((item) => !!Object.keys(item).length),
      );
  };

  const tableContextValue = useMemo(
    () => ({
      formsRef,
      setDataSource: mutate,
      formConfig,
      effect,
      dataSource: tableProps.dataSource,
    }),
    [mutate],
  );

  const form = useMemo(
    () => (
      // @ts-ignore
      <TableContext.Provider value={tableContextValue}>
        <Table
          {...tableProps}
          columns={columns}
          components={components}
          rowKey={({ uid }) => uid as string}
          // onRow={(record) => ({ record, formConfig, effect }) as any}
          scroll={{ x: true }}
          // className={styles.table}
          // @ts-ignore
          pagination={{
            onChange() {
              formsRef.current = [];
            },
          }}
          {..._tableProps}
        />
      </TableContext.Provider>
    ),
    [tableProps.dataSource?.map(({ uid }) => uid).join(',')],
  );

  return {
    form,
    add,
    remove,
    submit,
    formStoresRef: formsRef,
    mutate,
    move,
    tableProps,
  };
};

export default useTableForm;
