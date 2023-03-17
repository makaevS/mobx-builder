import { action } from 'mobx';
import {
  ActionSetter,
  ObservableSetter,
  PositionedActionSetter,
} from './types';

// export function makeObservableSetter<Store extends {}, Key extends keyof Store>(
//   store: Store,
//   key: Key
// ): Store[Key] extends (...args: any) => any
//   ? never
//   : ObservableSetter<Store[Key]> {
//   const setter: ObservableSetter<Store[Key]> = value => {
//     const nextValue = isFnValue<Store[Key]>(value) ? value(store[key]) : value;
//     store[key] = nextValue;
//   };
//   return action(setter) as never;
// }

// function isFnValue<Value>(value: unknown): value is (prev: Value) => Value {
//   return typeof value === 'function';
// }

// export function makeActionSetter<Store extends {}, Key extends keyof Store>(
//   store: Store,
//   key: Key
// ): Store[Key] extends (...args: any) => any ? ActionSetter<Store[Key]> : never {
//   const setter: ActionSetter<(...args: any) => any> = value => {
//     if (!isFnValue<Store[Key]>(value))
//       throw new Error('Action setter must receive a function');
//     const nextValue = value(store[key]);
//     store[key] = action(nextValue as never);
//   };
//   return action(setter) as never;
// }

// export function makeActionSetterBefore<
//   Store extends {},
//   Key extends keyof Store
// >(
//   store: Store,
//   key: Key
// ): Store[Key] extends (...args: any) => any
//   ? PositionedActionSetter<Store[Key]>
//   : never {
//   const setter: PositionedActionSetter<(...args: any) => any> = value => {
//     if (typeof value !== 'function')
//       throw new Error('Action setter must receive a function');
//     const nextValue = (...args: any) => {
//       value(...args);
//       (store[key] as any)?.(...args);
//     };
//     store[key] = action(nextValue) as never;
//   };
//   return action(setter) as never;
// }

// export function makeActionSetterAfter<
//   Store extends {},
//   Key extends keyof Store
// >(
//   store: Store,
//   key: Key
// ): Store[Key] extends (...args: any) => any
//   ? PositionedActionSetter<Store[Key]>
//   : never {
//   const setter: PositionedActionSetter<(...args: any) => any> = value => {
//     if (typeof value !== 'function')
//       throw new Error('Action setter must receive a function');
//     const nextValue = (...args: any) => {
//       (store[key] as any)?.(...args);
//       value(...args);
//     };
//     store[key] = action(nextValue) as never;
//   };
//   return action(setter) as never;
// }

// export function makeSetterKey(key: string): string {
//   return `set${key[0].toUpperCase()}${key.slice(1)}`;
// }

// export function makeExtenderKey(key: string): string {
//   return `extend${key[0].toUpperCase()}${key.slice(1)}`;
// }
