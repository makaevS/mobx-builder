export default function makeKeyForSetterAfter(key: string): string {
  return `setAfter${key[0].toUpperCase()}${key.slice(1)}`;
}
