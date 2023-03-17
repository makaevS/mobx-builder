import { isObservableProp, isAction } from 'mobx';
import Builder from '../Builder';

describe('Check store observables defining', () => {
  it('should define observables', () => {
    const store = new Builder().observables({ a: undefined }).create({});
    const isObservableA = isObservableProp(store, 'a');
    expect(isObservableA).toBeTruthy();
  });
  it('should define setters for observables', () => {
    const store = new Builder().observables({ a: undefined }).create({});
    expect(store.setA).toBeDefined();
  });
  it('should define setters as actions for observables', () => {
    const store = new Builder().observables({ a: undefined }).create({});
    const isActionSetA = isAction(store.setA);
    expect(isActionSetA).toBeTruthy();
  });
  it('should set simple value by setter', () => {
    const store = new Builder().observables({ a: 'prev' }).create({});
    store.setA('next');
    expect(store.a).toBe('next');
  });
  it('should set value from function by setter', () => {
    const store = new Builder().observables({ a: 'prev' }).create({});
    store.setA(prev => `${prev} to next`);
    expect(store.a).toBe('prev to next');
  });
  // it('should define extenders for observables', () => {
  //   const store = new Builder().observables({ a: undefined }).create();
  //   expect(store.extendA).toBeDefined();
  // });
  // it('should define extenders as actions for observables', () => {
  //   const store = new Builder().observables({ a: undefined }).create();
  //   const isActionExtendA = isAction(store.extendA);
  //   expect(isActionExtendA).toBeTruthy();
  // });
  // it('should extend value by extender', () => {
  //   const store = new Builder().observables({ a: 'prev' }).create();
  //   store.extendA(prev => `${prev.get()} and next`);
  //   expect(store.a).toBe('prev and next');
  // });
});
