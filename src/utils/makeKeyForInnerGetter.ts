export default function makeKeyForInnerGetter(key: string): string {
  return `_get${key[0].toUpperCase()}${key.slice(1)}`;
}
