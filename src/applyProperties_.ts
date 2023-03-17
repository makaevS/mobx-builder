import { computed } from 'mobx';
import { PropertiesMarkup } from './types';
import makeActionSetter from './utils/makeActionSetter';
import makeActionSetterAfter from './utils/makeActionSetterAfter';
import makeActionSetterBefore from './utils/makeActionSetterBefore';
import makeKeyForInnerGetter from './utils/makeKeyForInnerGetter';
import makeKeyForInnerProp from './utils/makeKeyForInnerProp';
import { makeKeyForSetter } from './utils/makeKeyForSetter';
import makeKeyForSetterAfter from './utils/makeKeyForSetterAfter';
import makeKeyForSetterBefore from './utils/makeKeyForSetterBefore';
import makeObservableSetter from './utils/makeObservableSetter';

export default function applyProperties(
  store: {},
  initial: {},
  markup: PropertiesMarkup,
  annotations: {}
): void {
  Object.keys(initial).forEach(key => {
    const type = markup[key];
    switch (type) {
      case 'observables': {
        const keyForInnerProp = makeKeyForInnerProp(key);
        const keyForInnerGetter = makeKeyForInnerGetter(key);
        const keyForSetter = makeKeyForSetter(key);
        store[keyForInnerProp as never] = initial[key as never];
        // store[keyForInnerGetter as never] = (() =>
        //   store[keyForInnerProp as never]) as never;
        // store[keyForInnerGetter as never] = computed(
        //   () => store[keyForInnerProp as never]
        // ) as never;
        Object.defineProperty(store, key, {
          configurable: true,
          enumerable: true,
          get: () => (store[keyForInnerGetter as never] as any)?.get?.(),
        });
        store[keyForSetter as never] = makeObservableSetter(
          store,
          keyForSetter as never,
          false
        ) as never;
        if (annotations[key as never]) {
          annotations[keyForInnerProp as never] = annotations[key as never];
          delete annotations[key as never];
        }
        annotations[keyForInnerGetter as never] = false as never;
        break;
      }
      case 'computeds': {
        const keyForInnerProp = makeKeyForInnerProp(key);
        const keyForInnerGetter = makeKeyForInnerProp(key);
        store[keyForInnerProp as never] = initial[key as never];
        // store[keyForInnerGetter as never] = computed(
        //   () => store[keyForInnerProp as never]
        // ) as never;
        Object.defineProperty(store, key, {
          configurable: true,
          enumerable: true,
          get: () => (store[keyForInnerGetter as never] as any)?.get?.(),
        });
        if (annotations[key as never]) {
          annotations[keyForInnerProp as never] = annotations[key as never];
          delete annotations[key as never];
        }
        annotations[keyForInnerGetter as never] = false as never;
        break;
      }
      case 'actions': {
        const keyForInnerProp = makeKeyForInnerProp(key);
        const keyForInnerGetter = makeKeyForInnerGetter(key);
        const keyForSetter = makeKeyForSetter(key);
        const keyForSetterBefore = makeKeyForSetterBefore(key);
        const keyForSetterAfter = makeKeyForSetterAfter(key);
        store[keyForInnerProp as never] = initial[key as never];
        // store[keyForInnerGetter as never] = computed(
        //   () => store[keyForInnerProp as never]
        // ) as never;
        Object.defineProperty(store, key, {
          configurable: true,
          enumerable: true,
          get: () => (store[keyForInnerGetter as never] as any)?.get?.(),
        });
        store[keyForSetter as never] = makeActionSetter(
          store,
          keyForSetter as never,
          false
        ) as never;
        store[keyForSetterBefore as never] = makeActionSetterBefore(
          store,
          keyForSetterBefore as never,
          false
        ) as never;
        store[keyForSetterAfter as never] = makeActionSetterAfter(
          store,
          keyForSetterAfter as never,
          false
        ) as never;
        if (annotations[key as never]) {
          annotations[keyForInnerProp as never] = annotations[key as never];
          delete annotations[key as never];
        }
        annotations[keyForInnerGetter as never] = false as never;
        break;
      }
      default:
        throw new Error(`Unknown type "${type}" for property "${key}"`);
    }
  });
}
