import { action } from 'mobx';
import { ActionSetter } from '../types';
import isFnValue from './isFnValue';

export default function makeActionSetter<
  Store extends {},
  Key extends keyof Store
>(
  store: Store,
  key: Key,
  wrap = true
): Store[Key] extends (...args: any) => any ? ActionSetter<Store[Key]> : never {
  const setter: ActionSetter<(...args: any) => any> = value => {
    if (!isFnValue<Store[Key]>(value))
      throw new Error('Action setter must receive a function');
    const nextValue = value(store[key]);
    store[key] = action(nextValue as never);
  };
  return (wrap ? action(setter) : setter) as never;
}
