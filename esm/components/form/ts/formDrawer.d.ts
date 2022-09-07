import { DrawerProps } from 'antd';
import { IForm } from '../type/form';
import { Values } from '../type/field';
import { FormStore } from './createFormStore';
declare type Props = DrawerProps & {
    values?: Values;
    formConfig: IForm;
    submit?(values: Values): Promise<any>;
    formWrapper?: (form: JSX.Element) => JSX.Element;
};
declare const callFormDrawer: (props: Props) => Promise<{
    formStore: FormStore;
    destory: Function;
}>;
export default callFormDrawer;
