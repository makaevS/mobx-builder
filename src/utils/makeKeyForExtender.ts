export function makeKeyForExtender(key: string): string {
  return `extend${key[0].toUpperCase()}${key.slice(1)}`;
}
