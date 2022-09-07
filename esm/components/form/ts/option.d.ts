import Axios from 'axios';
import { Link } from 'react-router-dom';
declare type Setting = {
    inlineTag: string;
    reportTime: number;
    request: typeof Axios;
    Link: typeof Link;
    isSuccess?: (res: any) => boolean;
};
export declare const setting: Setting;
export {};
