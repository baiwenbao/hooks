import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';

const useUpdate = (state?: any) => {
  const update$ = useMemo(() => new Subject<undefined>(), []);

  useEffect(() => {
    update$.next();
  }, [state]);

  useEffect(() => {
    return () => {
      update$.complete();
    };
  }, []);

  return update$;
};

export default useUpdate;
