import React, { Fragment, useContext, useEffect, useState } from 'react';
import { Row } from 'antd';
import FormItem from './formitem';
// import useWhere from '../ts/useWhere';
import { FormContext, SchemaContext } from '../ts/createFormStore';
import { parseExpr } from '../../../lib/useParseExpr';
import useUnmount from '../../../lib/useUnmount';
var FormGroup = function (props) {
    var group = props.group;
    var gutter = useContext(SchemaContext).schema.gutter;
    var title = group.title, extra = group.extra, formItems = group.formItems, component = group.component;
    var formStore = useContext(FormContext).formStore;
    var _a = useState(true), groupVisible = _a[0], setGroupVisible = _a[1];
    var unmount$ = useUnmount();
    var field$s = formStore.field$s;
    var element = (React.createElement(Row, { gutter: gutter }, formItems === null || formItems === void 0 ? void 0 : formItems.map(function (formItem, index) {
        return React.createElement(FormItem, { formItem: formItem, key: index });
    })));
    useEffect(function () {
        parseExpr({ visible: group.visible }, field$s, function (path, value) {
            if (typeof value === 'boolean') {
                setGroupVisible(value);
            }
        }, unmount$);
    }, []);
    // const visible = useWhere(group, 'visible');
    if (groupVisible === false)
        return null;
    return (React.createElement(Fragment, null, component ? (React.cloneElement(component, {
        title: title,
        extra: extra
    }, element)) : (React.createElement(Fragment, null,
        title,
        element))));
};
var FormGroups = function (props) {
    var groups = props.groups;
    return (React.createElement(React.Fragment, null, groups === null || groups === void 0 ? void 0 : groups.map(function (group, index) {
        return React.createElement(FormGroup, { group: group, key: index });
    })));
};
export default FormGroups;
//# sourceMappingURL=formGroup.js.map