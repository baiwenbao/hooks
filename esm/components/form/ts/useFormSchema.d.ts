import { IForm } from '../type/form';
declare const useFormSchema: (schema: IForm) => {
    schema: IForm;
    updateSchema: (schemaPart: Partial<IForm> & {
        [x: string]: any;
    }) => void;
};
export default useFormSchema;
