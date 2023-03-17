import { action } from 'mobx';
import { PositionedActionSetter } from '../types';

export default function makeActionSetterBefore<
  Store extends {},
  Key extends keyof Store
>(
  store: Store,
  key: Key,
  wrap = true
): Store[Key] extends (...args: any) => any
  ? PositionedActionSetter<Store[Key]>
  : never {
  const setter: PositionedActionSetter<(...args: any) => any> = value => {
    if (typeof value !== 'function')
      throw new Error('Action setter must receive a function');
    const nextValue = (...args: any) => {
      value(...args);
      (store[key] as any)?.(...args);
    };
    store[key] = action(nextValue) as never;
  };
  return (wrap ? action(setter) : setter) as never;
}
