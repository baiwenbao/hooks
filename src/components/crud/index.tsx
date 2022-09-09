import React, { useEffect, useMemo, useRef } from 'react';
import { IField, Values } from '../form/type/field';
import useForm, { setting } from '../form';
import useFormTable from '../table';
import { IForm } from '../form/type/form';
import { Col, Row, Table } from 'antd';
import { get, template } from 'lodash';
import { ActionProps, runApiAction, Action, AllActionProps } from '../action';
import loop from '../../lib/loop';
import compose from 'lodash/fp/compose';
import { ColumnProps } from 'antd/lib/table';
import useOptions from '../../components/form/ts/useOptions';
import immSet from '../../lib/setValues';
import pluginsFactory from './ts/plugins';
import { default as formplugins } from '../form/ts/hooks';

const Link = setting.Link;
type ShowScence = 'add' | 'edit' | 'list' | 'search';

type Api =
  | string
  | {
      url: string;
      method?: 'post' | 'get';
      headers?: any;
      data?: any;
      params?: any;
      path?: string;
    };

type Column = {
  label: string;
  field: IField;
  // 显示场景 默认
  location?: ShowScence | ShowScence[];
};

type CrudProps = {
  // 获取列表数据接口
  searchApi: Api;
  listPath: string;
  totalPath: string;
  // 默认10
  defaultPageSize?: number;
  // 是否手动获取数据， 默认true
  manual?: boolean;
  rowKey: string;
  columns: Column[];
  // 按钮定义
  actions: (AllActionProps & { location: 'header' | 'search' | 'list' })[];
};

export const defineCrudConfig = (config: CrudProps) => config;

const filterColums = (columns: Column[], type: 'add' | 'edit' | 'list' | 'search') => {
  const curColumns = columns
    .filter((column) => {
      const { location } = column;
      if (!location) return true;
      return Array.isArray(location) ? location.includes(type) : location === type;
    })
    .map((column) => ({
      label: column.label,
      field: column.field,
    }));
  return {
    columns: curColumns,
    type,
  };
};

const preHandleColumns = ({
  columns,
  type,
}: {
  columns: CrudProps['columns'];
  type: 'add' | 'edit' | 'list' | 'search';
}) => {
  let columnsClone = columns;
  loop(columns, (path, value) => {
    if (typeof value !== 'string' || !value.includes('$location')) return;
    const fn = new Function('$location', `return ${value}`);
    columnsClone = immSet(columnsClone, {
      [path]: fn(type),
    });
  });
  return columnsClone;
};

const ListOption = (field: IField<'select'> & { data: string | number }) => {
  const { data } = field;
  const stateOptions = useOptions(undefined, field);
  const label = stateOptions?.find((option) => option.value === data)?.label;
  return <>{label}</>;
};

const useCrud = <DataItem extends object>(props: CrudProps) => {
  const plugins = useMemo(() => pluginsFactory(), []);

  const {
    columns,
    searchApi,
    listPath,
    totalPath,
    manual = false,
    actions,
    rowKey,
    defaultPageSize,
  } = props;
  const refreshRef = useRef<Function>();

  const { addColumns, searchColumns, listColumns } = useMemo(() => {
    const addColumns = compose(preHandleColumns, filterColums)(columns, 'add');
    const editColumns = compose(preHandleColumns, filterColums)(columns, 'edit');

    const listColumns: CrudProps['columns'] = compose(preHandleColumns, filterColums)(
      columns,
      'list',
    );
    const searchColumns = compose(preHandleColumns, filterColums)(columns, 'search');

    const listActions = actions.filter((action) => {
      const { name, location } = action;
      return name === 'edit' || name === 'delete' || location === 'list';
    });

    const _listColumns: ColumnProps<DataItem>[] = listColumns.map((column) => {
      const { label, field } = column;
      const { name, options, link } = field;
      return {
        title: label,
        dataIndex: name,
        render(text, record) {
          const ret = options ? <ListOption {...(field as IField<'select'>)} data={text} /> : text;
          if (link) {
            const url = template(link.url)(record);
            return link.type === 'a' ? (
              <a target={link.type} href={url}>
                {ret}
              </a>
            ) : (
              <Link to={url} target={link.target}>
                {ret}
              </Link>
            );
          }
          return ret;
        },
      };
    });

    if (listActions.length) {
      const pathWithVars = [] as { path: string; value: string }[];

      loop(listActions, (path, value) => {
        if (typeof value !== 'string' || !value.includes('${')) return;
        pathWithVars.push({
          path,
          value,
        });
      });

      _listColumns.push({
        title: '操作',
        render(_, record) {
          // 替换配置中${pop}字段
          let listActionsClone = listActions;

          pathWithVars.forEach(({ path, value }) => {
            listActionsClone = immSet(listActionsClone, {
              [path]: template(value)(record),
            });
          });

          const buttons = listActionsClone
            .filter((action) => {
              // 过滤不可见的button
              const { visible } = action;
              if (typeof visible !== 'undefined') {
                const visibleFn = new Function(`return ${visible}`);
                return visibleFn() !== false;
              }
              return true;
            })
            .map((action, index) => {
              const { name } = action;

              if (editColumns && name === 'edit') {
                const editFormConfig: IForm = {
                  name: 'edit',
                  formItems: editColumns,
                };

                if (action.actionType === 'modal') {
                  action.modal.body = {
                    type: 'form',
                    formConfig: editFormConfig,
                    values: record as Values,
                  };
                  if (typeof action.modal.action.api === 'string') {
                    action.modal.action.api = {
                      url: action.modal.action.api,
                      successCallback: () => refreshRef.current!(),
                    };
                  } else {
                    action.modal.action.api.successCallback = () => refreshRef.current!();
                  }
                }
              } else if (action.actionType === 'api' && action.api) {
                if (typeof action.api === 'string') {
                  action.api = {
                    url: action.api,
                    successCallback: () => refreshRef.current!(),
                  };
                } else {
                  action.api.successCallback = () => refreshRef.current!();
                }
              }

              return (
                <Col key={index}>
                  <Action size="small" {...action} />
                </Col>
              );
            });

          return <Row gutter={8}>{buttons}</Row>;
        },
      });
    }

    return {
      addColumns,
      listColumns: plugins.tableColumns.call(_listColumns),
      searchColumns,
    };
  }, [columns]);

  const searchActions = actions.filter(
    (action) => action.location === 'search' || action.name === 'search',
  );

  const searchFormConfig: IForm = {
    name: 'search',
    layout: 'inline',
    formItems: searchColumns,
    buttons: searchActions.map((action) => {
      const { actionType, name } = action;

      if (actionType === 'reset') {
        action.reset = () => search.reset();
      } else if (actionType === 'submit') {
        action.submit = () =>
          formStore.submit((err) => {
            if (err) return;
            search.submit();
          });
      }

      if (name === 'search') {
        action.label = action.label ?? '搜索';
        action.type = action.type ?? 'primary';
      } else if (name === 'reset') {
        action.label = action.label ?? '重置';
      }

      return <Action {...action} />;
    }),
  };

  const { form, formStore } = useForm({
    formConfig: searchFormConfig,
  });

  const { tableProps, search, refresh } = useFormTable<DataItem>(
    ({ current, pageSize, ...values }) => {
      if (!searchApi)
        return Promise.resolve({
          list: [],
          total: 0,
        });
      return runApiAction(searchApi, {
        pageNum: current,
        pageSize,
        ...values,
      }).then((data) => {
        console.assert(get(data, listPath) !== undefined, `get(data, ${listPath}) is undefined`);
        console.assert(get(data, totalPath) !== undefined, `get(data, ${totalPath}) is undefined`);

        return {
          list: get(data, listPath),
          total: get(data, totalPath),
        };
      });
    },
    {
      formStore,
      manual,
    },
  );

  useEffect(() => {
    refreshRef.current = refresh;
  }, [refresh]);

  const headerActions = actions.filter(
    (action) => action.name === 'add' || action.name === 'export' || action.location === 'header',
  );

  const headerNodes = headerActions?.map((action, index) => {
    if (action.name === 'add') {
      const addFormConfig: IForm = {
        name: 'add',
        formItems: addColumns,
      };

      if (action.actionType === 'modal') {
        action.modal.body = {
          type: 'form',
          formConfig: addFormConfig,
        };

        if (typeof action.modal.action.api === 'string') {
          action.modal.action.api = {
            url: action.modal.action.api,
            successCallback: () => refresh(),
          };
        } else {
          action.modal.action.api.successCallback = () => refresh();
        }
      }

      action.label = action.label ?? '新增';
      action.type = action.type ?? 'primary';
    } else if (action.name === 'export') {
      action.label = action.label ?? '导出';
    }

    return (
      <Col key={index}>
        <Action {...action} />
      </Col>
    );
  });

  const crud = (
    <>
      {form}
      {headerActions && (
        <Row style={{ marginBottom: 8 }} gutter={8}>
          {headerNodes}
        </Row>
      )}
      <Table<DataItem> columns={listColumns} {...tableProps} rowKey={rowKey} />
    </>
  );

  return {
    crud,
    list: {
      tableProps,
      listColumns,
    },
    search: {
      form,
      formStore,
    },
    plugins,
    formplugins,
  };
};

export default useCrud;
