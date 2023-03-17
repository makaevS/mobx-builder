import { PropertiesMarkup } from './types';
import makeKeyForInnerGetter from './utils/makeKeyForInnerGetter';
import makeKeyForInnerProp from './utils/makeKeyForInnerProp';

export default function prepareObservables(
  payload: {},
  initial: {},
  markup: PropertiesMarkup
): void {
  Object.keys(payload).forEach(key => {
    initial[key as never] = payload[key as never];
    markup[key] = 'observables';
  });
}
