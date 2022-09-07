declare type ApiConf = {
    url: string;
    params?: any;
    data?: any;
    method?: string;
    path?: string;
};
export declare type Api = string | ApiConf;
export declare const runApi: (api: Api) => Promise<any>;
export {};
