import { FormContext } from './createFormStore';
import { useObservable } from 'rxjs-hooks';
import { useCallback, useContext } from 'react';
var useRegister = function (field) {
    var formStore = useContext(FormContext).formStore;
    var register = formStore.register, $ = formStore.$, setValues = formStore.setValues;
    var name = field.name;
    name && register(name, field);
    var state = useObservable(function () { return $(field.name); }, field);
    var onChange = useCallback(function (value) {
        var _a;
        name &&
            setValues((_a = {},
                _a[name] = value,
                _a), 'fieldChange');
    }, []);
    return {
        state: state,
        onChange: onChange
    };
};
export default useRegister;
//# sourceMappingURL=useRegister.js.map