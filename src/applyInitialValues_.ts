import { makeKeyForSetter } from './utils/makeKeyForSetter';

export default function applyInitialValues(store: {}, initial: {}): void {
  Object.keys(initial).forEach(key => {
    if (key in store) {
      const keyForSetter = makeKeyForSetter(key);
      (store[keyForSetter as never] as any)?.(initial[key as never]);
    }
  });
}
