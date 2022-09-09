import Axios from 'axios';
import { Link } from 'react-router-dom';

type Setting = {
  inlineTag: string;
  reportTime: number;
  request: typeof Axios;
  Link: typeof Link;
  // 判断接口是否成功
  isSuccess?: (res: any) => boolean;
};

export const setting: Setting = {
  inlineTag: '%',
  // field数据上行延时
  reportTime: 200,
  request: Axios,
  Link,
};
