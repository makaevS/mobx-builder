export function makeKeyForSetter(key: string): string {
  return `set${key[0].toUpperCase()}${key.slice(1)}`;
}
