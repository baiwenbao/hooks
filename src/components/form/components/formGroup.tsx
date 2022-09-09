import React, { Fragment, useContext, useEffect, useState } from 'react';
import { IForm } from '../type/form';
import { Row } from 'antd';
import FormItem from './formitem';
// import useWhere from '../ts/useWhere';
import { FormContext, SchemaContext } from '../ts/createFormStore';
import { parseExpr } from '../../../lib/useParseExpr';
import useUnmount from '../../../lib/useUnmount';

const FormGroup = (props: { group: Required<IForm>['groups'][0] }) => {
  const { group } = props;
  const {
    schema: { gutter },
  } = useContext(SchemaContext);
  const { title, extra, formItems, component } = group;
  const { formStore } = useContext(FormContext);
  const [groupVisible, setGroupVisible] = useState(true);
  const unmount$ = useUnmount();
  const { field$s } = formStore;

  const element = (
    <Row gutter={gutter}>
      {formItems?.map((formItem, index) => {
        return <FormItem formItem={formItem} key={index} />;
      })}
    </Row>
  );

  useEffect(() => {
    parseExpr(
      { visible: group.visible },
      field$s,
      (path, value) => {
        if (typeof value === 'boolean') {
          setGroupVisible(value);
        }
      },
      unmount$,
    );
  }, []);

  // const visible = useWhere(group, 'visible');
  if (groupVisible === false) return null;

  return (
    <Fragment>
      {component ? (
        React.cloneElement(
          component,
          {
            title,
            extra,
          },
          element,
        )
      ) : (
        <Fragment>
          {title}
          {element}
        </Fragment>
      )}
    </Fragment>
  );
};

const FormGroups = (props: { groups: IForm['groups'] }) => {
  const { groups } = props;

  return (
    <>
      {groups?.map((group, index) => {
        return <FormGroup group={group} key={index} />;
      })}
    </>
  );
};

export default FormGroups;
