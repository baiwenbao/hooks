declare type Values = {
    [x: string]: unknown;
};
/**
 * @example setValues({a: {b: {c: 1}}}, {'a.b.c': 2})
 */
declare const setValues: <T extends unknown>(target: T, values: Values) => T;
export default setValues;
