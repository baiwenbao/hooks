import { FormStore } from '../../ts/createFormStore';
import { IField, Value } from '../../type/field';
import { Subject } from 'rxjs';
export declare type PhoneProps = {
    formStore: FormStore;
    fieldState: IField;
    internalValue$: Subject<Value>;
    internalValue: Value;
    blur$: Subject<undefined>;
};
declare const Phone: (props: PhoneProps) => JSX.Element;
export default Phone;
