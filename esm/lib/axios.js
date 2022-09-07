import { __assign } from "tslib";
import Axios from 'axios';
import React from 'react';
import { message } from 'antd';
export var axios = Axios.create({
    timeout: 20000
});
axios.interceptors.request.use(function (config) {
    return __assign({}, config);
}, function (err) {
    return Promise.reject(err);
});
axios.interceptors.response.use(function (res) {
    var data = res.data;
    var errContent = function (content) {
        return React.createElement('pre', {}, content);
    };
    if (data.retMsg && data.retCode !== 0) {
        if (/\n/.test(data.retMsg)) {
            message.error(errContent(data.retMsg));
        }
        else {
            message.error(data.retMsg);
        }
    }
    return data;
}, function (err) {
    message.error(err);
    return Promise.reject(err);
});
export default axios;
//# sourceMappingURL=axios.js.map