import React from 'react';
import * as Ant from 'antd';
import { Api } from '../../lib/api';
import { BehaviorSubject } from 'rxjs';
import './plugins/transformConf';
export declare type IApp = ICom;
export declare type ICom = {
    type: Exclude<keyof typeof Ant, 'version'> | 'CRUD';
    data: any;
    transform?: (data: any) => any[];
    children?: ICom[] | ICom | string;
    id?: string;
    props: any;
    template?: ICom & {
        key?: string;
    };
};
export declare type AppContextValue = {
    com$s: {
        [x: string]: BehaviorSubject<any>;
    };
    api$s: {
        [x: string]: BehaviorSubject<any>;
    };
};
export declare type AppProps = {
    app: ICom;
    api?: {
        [x: string]: Api;
    };
    appContextValue?: AppContextValue;
};
export declare const AppContext: React.Context<AppContextValue | undefined>;
export declare const useApp: (props: AppProps) => JSX.Element;
