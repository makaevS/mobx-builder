import { computed } from 'mobx';
import { PropertiesMarkup } from './types';
import makeKeyForInnerGetter from './utils/makeKeyForInnerGetter';
import makeKeyForInnerProp from './utils/makeKeyForInnerProp';

export default function bindPropertiest(
  store: {},
  markup: PropertiesMarkup
): void {
  Object.keys(markup).forEach(key => {
    const type = markup[key];
    if (type !== 'observables' && type !== 'computeds' && type !== 'actions')
      return;
    const keyForInnerProp = makeKeyForInnerProp(key);
    const keyForInnerGetter = makeKeyForInnerGetter(key);
    store[keyForInnerGetter as never] = computed(
      () => store[keyForInnerProp as never]
    ) as never;
    // Object.defineProperty(store, key, {
    //   configurable: true,
    //   enumerable: true,
    //   get: () => (store[keyForInnerGetter as never] as any).get(),
    // });
  });
}
