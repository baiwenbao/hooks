import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';
var useUpdate = function (state) {
    var update$ = useMemo(function () { return new Subject(); }, []);
    useEffect(function () {
        update$.next();
    }, [state]);
    useEffect(function () {
        return function () {
            update$.complete();
        };
    }, []);
    return update$;
};
export default useUpdate;
//# sourceMappingURL=useUpdate.js.map