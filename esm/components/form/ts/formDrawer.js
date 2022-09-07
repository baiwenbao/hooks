import { __assign, __rest } from "tslib";
import React, { useEffect, useState } from 'react';
import { Drawer, Row, Space } from 'antd';
import useForm from '../index';
import { render, unmountComponentAtNode } from 'react-dom';
import { Action } from '../../action';
import { omit } from 'lodash';
var callFormDrawer = function (props) {
    var modalRoot = document.createElement('div');
    document.body.appendChild(modalRoot);
    var formConfig = props.formConfig, submit = props.submit, values = props.values, formWrapper = props.formWrapper, modalProps = __rest(props, ["formConfig", "submit", "values", "formWrapper"]);
    return new Promise(function (resolve) {
        var Content = function () {
            var _a;
            var _b = useState(false), visible = _b[0], setVisible = _b[1];
            var _c = useForm({ formConfig: omit(formConfig, 'actions') }), form = _c.form, formStore = _c.formStore;
            var remove = formStore.remove;
            var destory = function () {
                setVisible(false);
                setTimeout(function () {
                    var _a;
                    remove();
                    unmountComponentAtNode(modalRoot);
                    (_a = modalRoot.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(modalRoot);
                }, 300);
            };
            useEffect(function () {
                if (!formStore)
                    return;
                resolve({ formStore: formStore, destory: destory });
                // formStore执行完register后在setValues
                setTimeout(function () {
                    values && formStore.setValues(values);
                });
            }, [formStore]);
            useEffect(function () {
                setVisible(true);
            }, []);
            return (React.createElement(Drawer, __assign({ visible: visible, onClose: destory }, modalProps, { footer: React.createElement(Row, { justify: "end" },
                    React.createElement(Space, null, (_a = formConfig.actions) === null || _a === void 0 ? void 0 : _a.map(function (props, index) {
                        return React.createElement(Action, __assign({}, props, { key: index, context: { formStore: formStore, cancle: destory } }));
                    }))) }), formWrapper ? formWrapper(form) : form));
        };
        render(React.createElement(Content, null), modalRoot);
    });
};
export default callFormDrawer;
//# sourceMappingURL=formDrawer.js.map