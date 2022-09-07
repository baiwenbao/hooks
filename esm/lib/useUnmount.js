import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';
var useUnmount = function () {
    var unMount$ = useMemo(function () { return new Subject(); }, []);
    useEffect(function () {
        return function () {
            unMount$.next();
        };
    }, []);
    return unMount$;
};
export default useUnmount;
//# sourceMappingURL=useUnmount.js.map