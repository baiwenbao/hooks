import Axios from 'axios';
import React from 'react';
import { message } from 'antd';

export const axios = Axios.create({
  timeout: 20000,
});

axios.interceptors.request.use(
  (config) => {
    return {
      ...config,
    };
  },
  (err) => {
    return Promise.reject(err);
  },
);

axios.interceptors.response.use(
  (res) => {
    const { data } = res;

    const errContent = (content: string) => {
      return React.createElement('pre', {}, content);
    };
    if (data.retMsg && data.retCode !== 0) {
      if (/\n/.test(data.retMsg)) {
        message.error(errContent(data.retMsg));
      } else {
        message.error(data.retMsg);
      }
    }
    return data;
  },
  (err) => {
    message.error(err);
    return Promise.reject(err);
  },
);

export default axios;
