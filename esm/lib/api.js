import { __rest } from "tslib";
import { get } from 'lodash';
import { setting } from '../components/form/ts/option';
export var runApi = function (api) {
    var res;
    if (typeof api === 'string') {
        res = setting.request.get(api);
    }
    else {
        var path_1 = api.path, conf = __rest(api, ["path"]);
        res = setting.request(conf).then(function (response) {
            console.assert(path_1 && get(response, path_1) !== undefined, "get(response, ".concat(path_1, ") is undefined"));
            return path_1 ? get(response, path_1) : response;
        });
    }
    return res;
};
//# sourceMappingURL=api.js.map