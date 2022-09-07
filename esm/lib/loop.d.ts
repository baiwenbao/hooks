declare const loop: (target: unknown, effect: (path: string, value: number | string | boolean) => void, parentPath?: string) => void;
export default loop;
