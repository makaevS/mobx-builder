import { PropertiesMarkup } from './types';

export default function prepareActions(
  payload: (self: any) => {},
  initial: {},
  markup: PropertiesMarkup,
  store: {}
): void {
  const values = payload(store);
  Object.keys(values).forEach(key => {
    initial[key as never] = values[key as never];
    markup[key] = 'actions';
  });
}
