const loop = (
  target: unknown,
  effect: (path: string, value: number | string | boolean) => void,
  parentPath = '',
) => {
  if (typeof target === 'object' && target !== null) {
    if (Array.isArray(target)) {
      target.forEach((item, index) => {
        const path = parentPath ? `${parentPath}.${index}` : String(index);
        loop(item, effect, path);
      });
    } else {
      Object.keys(target).forEach((key) => {
        const path = parentPath ? `${parentPath}.${key}` : key;
        const item = target[key as keyof typeof target];
        loop(item, effect, path);
      });
    }
  } else {
    effect?.(parentPath, target as string | number | boolean);
  }
};

export default loop;
