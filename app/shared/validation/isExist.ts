const text = 'Обязательно к заполнению';

export function isExist<T = string>(keys: (keyof T)[], from: T, to: T): void {
  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as keyof T;

    to[key] = (((from[key] as string)?.length ?? 0) > 0 ? undefined : text) as any;
  }
}
