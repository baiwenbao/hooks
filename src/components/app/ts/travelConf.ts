import { BehaviorSubject } from 'rxjs';
import { IApp, ICom } from '../index';

declare type Com$s = { [x: string]: BehaviorSubject<ICom['data']> };

export const travelConf = (target: IApp, rootCom$s?: Com$s) => {
  const com$s = rootCom$s ?? ({} as Com$s);

  const fib = (com: ICom) => {
    const { id, data, children } = com;

    if (typeof id !== 'undefined') {
      console.assert(!Reflect.has(com$s, id), `id: ${id}重复`);
      Object.assign(com$s, {
        [id]: new BehaviorSubject(data),
      });
    }

    if (children && typeof children === 'object') {
      if (Array.isArray(children)) {
        children.forEach((child) => {
          fib(child);
        });
      } else {
        fib(children);
      }
    }
  };

  fib(target);

  return com$s;
};
