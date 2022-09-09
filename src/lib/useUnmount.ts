import { useMemo, useEffect } from 'react';
import { Subject } from 'rxjs';

const useUnmount = () => {
  const unMount$ = useMemo(() => new Subject<undefined>(), []);

  useEffect(() => {
    return () => {
      unMount$.next();
    };
  }, []);

  return unMount$;
};

export default useUnmount;
