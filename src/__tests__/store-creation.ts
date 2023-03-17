import { isObservable } from 'mobx';
import Builder from '../Builder';

describe('Check store instance creation', () => {
  it('should create an mobx store', () => {
    const store = new Builder().create({});
    const isMobxObservable = isObservable(store);
    expect(isMobxObservable).toBeTruthy();
  });
  it('should create two different stores', () => {
    const builder = new Builder().observables({ test: 'test' });
    const store1 = builder.create({});
    const store2 = builder.create({});
    expect(store1).not.toBe(store2);
  });
  it('should create store with default values', () => {
    const store = new Builder().observables({ a: 'default value' }).create({});
    expect(store.a).toBe('default value');
  });
  it('should create store with initial values', () => {
    const store = new Builder().observables({ a: 'default value' }).create({
      a: 'initial value',
    });
    expect((store as any)._a).toBe('initial value');
  });
});
