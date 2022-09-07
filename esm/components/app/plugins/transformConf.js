import loop from '../../../lib/loop';
import { plugins } from './index';
import { parse } from 'query-string';
import { set, template } from 'lodash';
import { $query, $cookie, $localStorage } from '../ts/constant';
import Cookies from 'js-cookie';
plugins.transformConf.tap('base transform', function (conf) {
    loop(conf, function (path, value) {
        var _a;
        // 转换搜索参数
        if (typeof value !== 'string')
            return;
        var match = [$query, $cookie, $localStorage].some(function (item) {
            return value.includes(item);
        });
        if (match) {
            var searchStr = location.href.split('?')[1];
            var search = parse(searchStr);
            var compiled = template(value, {
                interpolate: /@\{([\s\S]+?)}/g
            });
            var val = compiled((_a = {},
                _a[$query] = search,
                _a[$cookie] = Cookies.get(),
                _a[$localStorage] = localStorage,
                _a));
            set(conf, path, val);
        }
    });
    return conf;
});
//# sourceMappingURL=transformConf.js.map