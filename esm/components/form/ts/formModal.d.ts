import { ModalFuncProps } from 'antd/lib/modal';
import { IForm } from '../type/form';
import { Values } from '../type/field';
import { FormStore } from './createFormStore';
declare type Props = ModalFuncProps & {
    values?: Values;
    formConfig: IForm;
    submit?: (values: Values) => Promise<any>;
    formWrapper?: (form: JSX.Element) => JSX.Element;
};
declare const callFormModal: (props: Props) => Promise<{
    formStore: FormStore;
    destory: Function;
}>;
export default callFormModal;
