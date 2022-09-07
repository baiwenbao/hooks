import { IField } from '../components/form/type/field';
import { Observable, Subject } from 'rxjs';
/**
 *
 * @example
 * url: 'http://localhost:8080/api/upload/file?n=@{field1.value === 1}&t=@{field2.value === field3.value}'
 * visible: '@{field1.value === 1}',
 * visible: '@{field1.value === field2.value}',
 */
export declare const parseExpr: (config: Object, ob$s: Record<string, Observable<any>>, effect: (path: string, result: string | boolean) => void, unmount$: Subject<undefined>) => void;
export declare const useParseExpr: (fieldState: IField) => void;
