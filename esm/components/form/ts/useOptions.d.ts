import { IField, Option, OptionableTypes } from '../type/field';
import { FormStore } from './createFormStore';
export declare const keyValueMapping: (options: Partial<Option>[] | undefined, mapping: string[] | ((record: Partial<Option>) => [Option[keyof Option], Option[keyof Option]])) => Option[] | undefined;
declare const useOptions: (formStore: FormStore | undefined, field: IField<OptionableTypes>) => Option[] | undefined;
export default useOptions;
