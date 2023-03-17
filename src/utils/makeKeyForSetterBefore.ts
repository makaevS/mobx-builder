export default function makeKeyForSetterBefore(key: string): string {
  return `setBefore${key[0].toUpperCase()}${key.slice(1)}`;
}
