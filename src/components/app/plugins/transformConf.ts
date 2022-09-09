import loop from '../../../lib/loop';
import { plugins } from './index';
import { parse } from 'query-string';
import { set, template } from 'lodash';
import { $query, $cookie, $localStorage } from '../ts/constant';
import Cookies from 'js-cookie';

plugins.transformConf.tap('base transform', (conf) => {
  loop(conf, (path, value) => {
    // 转换搜索参数
    if (typeof value !== 'string') return;
    const match = [$query, $cookie, $localStorage].some((item) => value.includes(item));
    if (match) {
      const searchStr = location.href.split('?')[1];
      const search = parse(searchStr);
      const compiled = template(value, {
        interpolate: /@\{([\s\S]+?)}/g,
      });
      const val = compiled({
        [$query]: search,
        [$cookie]: Cookies.get(),
        [$localStorage]: localStorage,
      });
      set(conf, path, val);
    }
  });
  return conf;
});
