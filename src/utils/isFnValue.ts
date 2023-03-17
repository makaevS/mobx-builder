export default function isFnValue<Value>(
  value: unknown
): value is (prev: Value) => Value {
  return typeof value === 'function';
}
