import { __assign, __rest } from "tslib";
import React, { useState } from 'react';
import { Modal } from 'antd';
import { render, unmountComponentAtNode } from 'react-dom';
import { AppContext } from '../components/app';
export var callModal = function (props) {
    var modalRoot = document.createElement('div');
    document.body.appendChild(modalRoot);
    var content = props.content, buttons = props.buttons, appContextValue = props.appContextValue, modalProps = __rest(props, ["content", "buttons", "appContextValue"]);
    return new Promise(function (resolve) {
        var Content = function () {
            var _a = useState(true), visible = _a[0], setVisible = _a[1];
            var destory = function () {
                setVisible(false);
                setTimeout(function () {
                    var _a;
                    unmountComponentAtNode(modalRoot);
                    (_a = modalRoot.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(modalRoot);
                }, 300);
            };
            resolve({ destory: destory });
            return (React.createElement(AppContext.Provider, { value: appContextValue },
                React.createElement(Modal, __assign({ okText: '\u786E\u5B9A', cancelText: '\u53D6\u6D88', visible: visible, onCancel: function () {
                        destory();
                    }, onOk: function () {
                        destory();
                    }, footer: buttons }, modalProps), content)));
        };
        render(React.createElement(Content, null), modalRoot);
    });
};
//# sourceMappingURL=callModal.js.map