import { get } from 'lodash';
import { setting } from '../components/form/ts/option';

type ApiConf = {
  url: string;
  params?: any;
  data?: any;
  method?: string;
  path?: string;
};

export type Api = string | ApiConf;

export const runApi = (api: Api) => {
  let res;
  if (typeof api === 'string') {
    res = setting.request.get(api);
  } else {
    const { path, ...conf } = api;
    res = setting.request(conf).then((response) => {
      console.assert(
        path && get(response, path) !== undefined,
        `get(response, ${path}) is undefined`,
      );
      return path ? get(response, path) : response;
    });
  }

  return res;
};
