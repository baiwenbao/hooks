import { Where, IField, Values } from '../type/field';
import { IFormItem } from '../type/formitem';
import { IForm } from '../type/form';
export declare const check: (where: Where, values: Values, name: keyof Where) => boolean | undefined;
declare const useWhere: (struct: IField | IFormItem | Required<IForm>['groups'][0], property: string) => boolean;
export default useWhere;
