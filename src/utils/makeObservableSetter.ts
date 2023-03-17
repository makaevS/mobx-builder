import { action } from 'mobx';
import { ObservableSetter } from '../types';
import isFnValue from './isFnValue';
import makeKeyForInnerProp from './makeKeyForInnerProp';

export default function makeObservableSetter<
  Store extends {},
  Key extends keyof Store
>(
  store: Store,
  key: Key,
  wrap = true
): Store[Key] extends (...args: any) => any
  ? never
  : ObservableSetter<Store[Key]> {
  const keyForInnerProp = makeKeyForInnerProp(key as string);
  const setter: ObservableSetter<Store[Key]> = value => {
    const nextValue = isFnValue<Store[Key]>(value)
      ? value(store[keyForInnerProp as never])
      : value;
    store[keyForInnerProp as never] = nextValue as never;
  };
  return (wrap ? action(setter) : setter) as never;
}
