import React from 'react';
import { Input, Select } from 'antd';
import * as model from './ts/model';
var Phone = function (props) {
    var fieldState = props.fieldState, internalValue$ = props.internalValue$, internalValue = props.internalValue, blur$ = props.blur$;
    var width = fieldState.width;
    var _a = (internalValue !== null && internalValue !== void 0 ? internalValue : []), _b = _a[0], codeValue = _b === void 0 ? '+86' : _b, phoneValue = _a[1];
    var handleChange = function (e) {
        if (typeof e === 'string') {
            internalValue$.next([e, phoneValue]);
        }
        else {
            var value = e.target.value;
            internalValue$.next([codeValue, value]);
        }
    };
    var select = (React.createElement(Select, { value: codeValue, onChange: function (value) { return handleChange(value); } }, model.prefixOptions.map(function (_a) {
        var value = _a.value, label = _a.label;
        return (React.createElement(Select.Option, { value: value, key: value }, label));
    })));
    return (React.createElement(Input, { addonBefore: select, value: phoneValue, onChange: handleChange, style: { width: width }, onBlur: function () { return blur$.next(); } }));
};
export default Phone;
//# sourceMappingURL=com.js.map