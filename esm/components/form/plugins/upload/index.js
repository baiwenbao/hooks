import { __assign, __awaiter, __generator, __rest } from "tslib";
import React, { useEffect, useState } from 'react';
import { Upload, message, Button } from 'antd';
import plugins from '../../ts/hooks';
import { LoadingOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { omit } from 'lodash';
import { pluck, filter, take, delay } from 'rxjs/operators';
var FileUpload = function (props) {
    var _a;
    var fieldState = props.fieldState, formStore = props.formStore, maxCount = props.maxCount, originBeforeUpload = props.beforeUpload, onChange = props.onChange, change$ = props.change$, onRemove = props.onRemove, rest = __rest(props, ["fieldState", "formStore", "maxCount", "beforeUpload", "onChange", "change$", "onRemove"]);
    var maxSize = fieldState.maxSize, getResUrl = fieldState.getResUrl, value = fieldState.value;
    var dispatch = formStore.dispatch, $ = formStore.$;
    var _b = useState(), loading = _b[0], setLoading = _b[1];
    var beforeUpload = function (file, fileList) {
        var isMatchSize = maxSize ? file.size / 1024 / 1024 <= maxSize : true;
        if (!isMatchSize) {
            message.error("\u6587\u4EF6\u5927\u4E8E".concat(maxSize, "MB"));
        }
        return Promise.resolve(originBeforeUpload ? originBeforeUpload(file, fileList) : true).then(function () {
            if (isMatchSize)
                return true;
            return Promise.reject("\u6587\u4EF6\u5927\u4E8E".concat(maxSize, "MB"));
        });
    };
    var handleChange = function (info) {
        if (info.file.status === 'uploading') {
            setLoading(true);
        }
        else if (info.file.status === 'done') {
            setLoading(false);
        }
        else if (info.file.status === 'error') {
            setLoading(false);
        }
        var updateState = { 'props.fileList': info.fileList };
        if (info.file.status === 'done') {
            if (maxCount && maxCount > 1) {
                var urls = info.fileList.map(function (file) {
                    return getResUrl ? getResUrl(file.response) : file.url;
                });
                Object.assign(updateState, {
                    value: urls,
                });
            }
            else {
                var url = getResUrl ? getResUrl(info.file.response) : info.file.url;
                Object.assign(updateState, {
                    value: url,
                });
            }
            info.file.url = getResUrl ? getResUrl(info.file.response) : info.file.url;
        }
        dispatch(fieldState.name, updateState);
    };
    var handleRemove = function (file) { return __awaiter(void 0, void 0, void 0, function () {
        var result, url_1, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.resolve(onRemove ? onRemove(file) : true)];
                case 1:
                    result = _b.sent();
                    if (result === false)
                        return [2 /*return*/, false];
                    url_1 = getResUrl && file.response ? getResUrl(file.response) : file.url;
                    if (maxCount && maxCount > 1 && ((_a = fieldState.value) === null || _a === void 0 ? void 0 : _a.length)) {
                        dispatch(fieldState.name, {
                            value: fieldState.value.filter(function (_url) { return _url !== url_1; }),
                        });
                    }
                    else {
                        dispatch(fieldState.name, { value: undefined });
                    }
                    return [2 /*return*/, true];
                case 2:
                    error_1 = _b.sent();
                    return [2 /*return*/, false];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var uploadButton = (React.createElement("div", null,
        loading ? React.createElement(LoadingOutlined, null) : React.createElement(PlusOutlined, null),
        React.createElement("div", { style: { marginTop: 8 } }, "\u4E0A\u4F20")));
    var defaultFileList = Array.isArray(value)
        ? value.map(function (url) { return ({ url: url, uid: '-1', status: 'done' }); })
        : { url: value };
    // 初始化回显fileList
    useEffect(function () {
        $(fieldState.name)
            .pipe(pluck('value'), filter(function (value) { return !!value; }), take(1), 
        // 防止 {props.fileList: []}更新早于{value: fileList}
        delay(0))
            .subscribe(function (value) {
            var finalValue = Array.isArray(value) ? value : [value];
            dispatch(fieldState.name, {
                'props.fileList': finalValue.map(function (url) {
                    var fileName = url.split('/').pop();
                    return { url: url, uid: '-1', status: 'done', name: fileName };
                }),
            });
        });
    }, []);
    return (React.createElement(Upload, __assign({}, omit(rest, 'value'), { fileList: (_a = fieldState.props) === null || _a === void 0 ? void 0 : _a.fileList, onRemove: handleRemove, maxCount: maxCount, beforeUpload: beforeUpload, onChange: handleChange }), rest.listType === 'picture-card' ? (uploadButton) : (React.createElement(Button, { icon: React.createElement(UploadOutlined, null) }, "\u4E0A\u4F20"))));
};
// @ts-ignore
plugins.field.tap('upload', function (customFieldProps) {
    // @ts-ignore
    return React.createElement(FileUpload, __assign({}, customFieldProps));
});
//# sourceMappingURL=index.js.map