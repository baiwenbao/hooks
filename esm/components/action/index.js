import { __assign, __awaiter, __generator, __rest } from "tslib";
import React, { useContext, useEffect, useReducer, useRef, useState, } from 'react';
import { Button, message } from 'antd';
import Modal from 'antd/lib/modal';
import callFormModal from '../form/ts/formModal';
import { get, set, omit } from 'lodash';
import { setting } from '../form/ts/option';
import { AppContext, useApp } from '../app';
import { callModal } from '../../lib/callModal';
import { parseExpr } from '../../lib/useParseExpr';
import useUnmount from '../../lib/useUnmount';
import setValues from '../../lib/setValues';
var Link = setting.Link;
export var runApiAction = function (api, values, confirmText, disabledRef) { return __awaiter(void 0, void 0, void 0, function () {
    var isOk, _a, res, finalParams, finalData, successText, errorText, successCallback;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                if (!confirmText) return [3 /*break*/, 2];
                return [4 /*yield*/, new Promise(function (resolve) {
                        Modal.confirm({
                            title: confirmText,
                            okText: '确定',
                            cancelText: '取消',
                            onOk: function () {
                                resolve(true);
                            },
                            onCancel: function () {
                                resolve(false);
                            },
                        });
                    })];
            case 1:
                _a = _c.sent();
                return [3 /*break*/, 3];
            case 2:
                _a = true;
                _c.label = 3;
            case 3:
                isOk = _a;
                if (!isOk)
                    return [2 /*return*/];
                if (disabledRef === null || disabledRef === void 0 ? void 0 : disabledRef.current)
                    return [2 /*return*/];
                disabledRef && (disabledRef.current = true);
                if (typeof api === 'string') {
                    res = setting.request.get(api, {
                        params: values,
                    });
                }
                else {
                    api.method = (_b = api.method) !== null && _b !== void 0 ? _b : 'get';
                    finalParams = typeof api.params === 'function' ? api.params(values) : __assign(__assign({}, values), api.params);
                    finalData = typeof api.data === 'function' ? api.data(values) : __assign(__assign({}, values), api.data);
                    res = setting
                        .request(__assign(__assign({}, api), { params: api.method === 'get' ? finalParams : api.params, data: ['post', 'put'].includes(api.method) ? finalData : api.data }))
                        .then(function (response) {
                        var path = api.path;
                        return path ? get(response, path) : response;
                    });
                }
                successText = typeof api === 'object' ? api.successText : undefined;
                errorText = typeof api === 'object' ? api.errorText : undefined;
                successCallback = typeof api === 'object' ? api.successCallback : undefined;
                return [2 /*return*/, res
                        .then(function (data) {
                        var isSuccess = false;
                        if (!!setting.isSuccess) {
                            isSuccess = setting.isSuccess(data);
                        }
                        else {
                            isSuccess = data.status === 0 || data.code === 200;
                        }
                        if (isSuccess) {
                            successText && message.success(successText);
                            successCallback === null || successCallback === void 0 ? void 0 : successCallback(data);
                        }
                        else {
                            errorText && message.error(errorText);
                        }
                        return data;
                    }, function (err) {
                        errorText && message.error(errorText);
                        return Promise.reject(err);
                    })
                        .finally(function () {
                        disabledRef && (disabledRef.current = false);
                    })];
        }
    });
}); };
export var Action = function (props) {
    var _a, _b;
    var disabledRef = useRef(false);
    var appContextValue = useContext(AppContext);
    var _c = useState(false), loading = _c[0], setLoading = _c[1];
    var unmount$ = useUnmount();
    var _d = useReducer(function (count) { return count + 1; }, 0), _ = _d[0], forceUpdate = _d[1];
    var propsRef = useRef(props);
    var _e = propsRef.current, label = _e.label, type = _e.type, actionType = _e.actionType, confirmText = _e.confirmText, reset = _e.reset, submit = _e.submit, visible = _e.visible, context = _e.context, rest = __rest(_e, ["label", "type", "actionType", "confirmText", "reset", "submit", "visible", "context"]);
    useEffect(function () {
        appContextValue &&
            parseExpr(omit(props, 'context'), __assign(__assign({}, appContextValue.com$s), appContextValue.api$s), function (path, result) {
                var _a;
                propsRef.current = setValues(propsRef.current, (_a = {},
                    _a[path] = result,
                    _a));
                forceUpdate();
            }, unmount$);
    }, []);
    if (typeof visible === 'string') {
        var visibleFn = new Function("return ".concat(visible));
        if (visibleFn() === false)
            return null;
    }
    if (props.actionType === 'link') {
        var target = props.target, link = props.link;
        return (React.createElement(Button, __assign({ type: type }, rest),
            React.createElement(Link, { to: link, target: target }, label)));
    }
    if (props.actionType === 'url') {
        var target = props.target, url = props.url;
        return (React.createElement(Button, __assign({ type: type }, rest),
            React.createElement("a", { target: target, href: url }, label)));
    }
    if (props.actionType === 'api') {
        var api_1 = props.api, confirmText_1 = props.confirmText;
        return (React.createElement(Button, __assign({ type: type, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, , 2, 3]);
                            setLoading(true);
                            return [4 /*yield*/, runApiAction(api_1, undefined, confirmText_1, disabledRef)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            setLoading(false);
                            return [7 /*endfinally*/];
                        case 3: return [2 /*return*/];
                    }
                });
            }); }, loading: loading }, omit(rest, 'successText', 'errorText')), label));
    }
    if (props.actionType === 'modal') {
        var modal_1 = props.modal;
        var title_1 = modal_1.title, bodyType_1 = modal_1.body.type, action = modal_1.action, actions_1 = modal_1.actions, modalProps_1 = __rest(modal_1, ["title", "body", "action", "actions"]);
        if (bodyType_1 === 'form') {
            var _f = modal_1.body, formConfig_1 = _f.formConfig, values_1 = _f.values, initialApi_1 = _f.initialApi;
            return (React.createElement(Button, __assign({ type: type, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var formStore_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(bodyType_1 === 'form')) return [3 /*break*/, 2];
                                // const { api, label = '确定' } = action;
                                if (initialApi_1 && typeof initialApi_1 === 'object') {
                                    runApiAction(__assign(__assign({}, initialApi_1), { successCallback: function (data) {
                                            formStore_1.setValues(data);
                                        } }), undefined, undefined);
                                }
                                return [4 /*yield*/, callFormModal(__assign({ title: title_1, formConfig: formConfig_1, 
                                        // okText: label,
                                        values: values_1 }, modalProps_1))];
                            case 1:
                                formStore_1 = (_a.sent()).formStore;
                                _a.label = 2;
                            case 2: return [2 /*return*/];
                        }
                    });
                }); } }, rest), label));
        }
        else {
            var Content_1 = function () {
                var content = useApp({ app: modal_1.body, appContextValue: appContextValue });
                return content;
            };
            return (React.createElement(Button, __assign({ type: type, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var buttons, destory;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                buttons = actions_1 === null || actions_1 === void 0 ? void 0 : actions_1.map(function (actionProps, index) {
                                    if (actionProps.actionType === 'api') {
                                        set(actionProps, 'api.successCallback', function () {
                                            destory();
                                        });
                                    }
                                    return React.createElement(Action, __assign({ key: index, context: { cancle: function () { return destory(); } } }, actionProps));
                                });
                                return [4 /*yield*/, callModal(__assign({ title: title_1, content: React.createElement(Content_1, null), buttons: buttons, appContextValue: appContextValue }, modalProps_1))];
                            case 1:
                                destory = (_a.sent()).destory;
                                return [2 /*return*/];
                        }
                    });
                }); } }, rest), label));
        }
    }
    if (props.actionType === 'reset') {
        var reset_1 = props.reset;
        var fn_1 = (_b = (_a = context === null || context === void 0 ? void 0 : context.formStore) === null || _a === void 0 ? void 0 : _a.resetFields) !== null && _b !== void 0 ? _b : reset_1;
        return (React.createElement(Button, __assign({ type: type, onClick: function () { return fn_1 === null || fn_1 === void 0 ? void 0 : fn_1(); } }, rest), label !== null && label !== void 0 ? label : '重置'));
    }
    if (props.actionType === 'submit') {
        var submit_1 = props.submit, api_2 = props.api, confirmText_2 = props.confirmText;
        useEffect(function () {
            var _a;
            (_a = context === null || context === void 0 ? void 0 : context.formStore) === null || _a === void 0 ? void 0 : _a.submitEvent$.subscribe(function () {
                fn_2 === null || fn_2 === void 0 ? void 0 : fn_2();
            });
        }, []);
        var fn_2 = (context === null || context === void 0 ? void 0 : context.formStore)
            ? function () {
                var _a;
                return (_a = context.formStore) === null || _a === void 0 ? void 0 : _a.submit(function (err, values) { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                if (err || !api_2)
                                    return [2 /*return*/];
                                setLoading(true);
                                _b.label = 1;
                            case 1:
                                _b.trys.push([1, , 3, 4]);
                                return [4 /*yield*/, runApiAction(api_2, values, confirmText_2)];
                            case 2:
                                _b.sent();
                                return [3 /*break*/, 4];
                            case 3:
                                setLoading(false);
                                return [7 /*endfinally*/];
                            case 4:
                                (_a = context.cancle) === null || _a === void 0 ? void 0 : _a.call(context);
                                return [2 /*return*/];
                        }
                    });
                }); });
            }
            : submit_1;
        return (React.createElement(Button, __assign({ type: type, loading: loading, onClick: function () { return fn_2 === null || fn_2 === void 0 ? void 0 : fn_2(); } }, rest), label !== null && label !== void 0 ? label : '搜索'));
    }
    if (props.actionType === 'cancel') {
        var reset_2 = props.reset;
        return (React.createElement(Button, __assign({ type: type, onClick: context ? function () { var _a; return (_a = context.cancle) === null || _a === void 0 ? void 0 : _a.call(context); } : undefined }, rest), label !== null && label !== void 0 ? label : '取消'));
    }
    return (React.createElement(Button, __assign({ type: type }, rest), label));
};
//# sourceMappingURL=index.js.map