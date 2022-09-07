export declare enum Formatter {
    'yuan' = 1,
    'fen' = 2,
    'percent' = 3,
    'thousands' = 4,
    'float' = 5,
    'time' = 6
}
declare const format: (value: unknown, formatter?: string | string[] | undefined) => unknown;
export default format;
