import { BehaviorSubject } from 'rxjs';
import { IApp, ICom } from '../index';
declare type Com$s = {
    [x: string]: BehaviorSubject<ICom['data']>;
};
export declare const travelConf: (target: IApp, rootCom$s?: Com$s | undefined) => Com$s;
export {};
