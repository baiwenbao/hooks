import { useState } from 'react';
import immSet from '../../../lib/setValues';
var useFormSchema = function (schema) {
    var _a = useState(schema), _schema = _a[0], setSchema = _a[1];
    var updateSchema = function (schemaPart) {
        setSchema(function (schema) { return immSet(schema, schemaPart); });
    };
    return {
        schema: _schema,
        updateSchema: updateSchema
    };
};
export default useFormSchema;
//# sourceMappingURL=useFormSchema.js.map