import { __assign } from "tslib";
import { useEffect, useState } from 'react';
import { useRequest } from 'ahooks';
var defaultPageSize = 10;
var useFormTable = function (getTableData, options) {
    var formStore = options.formStore, defaultParams = options.defaultParams, refreshDeps = options.refreshDeps;
    var _a = useState({
        defaultPageSize: defaultPageSize,
        current: 1,
        pageSize: defaultPageSize,
        onChange: function (current, pageSize) {
            setPaginationConfig(__assign(__assign({}, paginationConfig), { current: current, pageSize: pageSize }));
            run({ current: current, pageSize: pageSize }, formStore === null || formStore === void 0 ? void 0 : formStore.getValues());
        },
    }), paginationConfig = _a[0], setPaginationConfig = _a[1];
    var _b = useRequest(function (params, values) {
        return getTableData(__assign({ current: params.current, pageSize: params.pageSize }, values));
    }, {
        manual: true,
        refreshDeps: refreshDeps,
    }), run = _b.run, refresh = _b.refresh, mutate = _b.mutate, params = _b.params, data = _b.data, loading = _b.loading, error = _b.error;
    var submit = function (params) {
        var _a;
        var formValues = params === null || params === void 0 ? void 0 : params[1];
        var current = (_a = params === null || params === void 0 ? void 0 : params[0].current) !== null && _a !== void 0 ? _a : 1;
        setPaginationConfig(function (paginationConfig) { return (__assign(__assign({}, paginationConfig), { current: current })); });
        if (formValues) {
            run.apply(void 0, params);
            return;
        }
        var values = formStore === null || formStore === void 0 ? void 0 : formStore.getValues();
        run({
            current: current,
            pageSize: paginationConfig.pageSize,
        }, values);
    };
    var reset = function () {
        formStore === null || formStore === void 0 ? void 0 : formStore.resetFields();
        var values = formStore === null || formStore === void 0 ? void 0 : formStore.getValues();
        setPaginationConfig(function (paginationConfig) { return (__assign(__assign({}, paginationConfig), { current: 1 })); });
        run({ current: 1, pageSize: paginationConfig.pageSize }, values);
    };
    useEffect(function () {
        (defaultParams === null || defaultParams === void 0 ? void 0 : defaultParams[1]) && (formStore === null || formStore === void 0 ? void 0 : formStore.setValues(defaultParams === null || defaultParams === void 0 ? void 0 : defaultParams[1]));
        submit(defaultParams);
    }, []);
    return {
        formStore: formStore,
        run: run,
        mutate: mutate,
        tableProps: {
            dataSource: data === null || data === void 0 ? void 0 : data.list,
            loading: loading,
            error: error,
            pagination: __assign(__assign({ total: data === null || data === void 0 ? void 0 : data.total }, paginationConfig), { showQuickJumper: true, showSizeChanger: true }),
        },
        refresh: refresh,
        search: {
            submit: submit,
            reset: reset,
        },
    };
};
export { useFormTable };
export default useFormTable;
//# sourceMappingURL=index.js.map