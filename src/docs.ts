import { observable } from 'mobx';
import Builder from './Builder';

// @todo check if .observables({ a: undefined }) will have 'a' as observable property.

// Builder must be used with the mobx package (mobx is it's peer dependency).
// You can imagine that every builder instance contains a template of the store that specific builder instance can create. (It does not reflects the real implementation but it is the idea that stands behind mobx-builder.)
// Builder instance has methods that allow you to define properties and methods of the template.
// Every method of the builder instance (except for 'create' method) will return a new builder instance with new template.
// 'create' method will return a new mobx store based on the builder template.

// You can create a new builder instance with Builder class.
// You can but you should not pass any arguments to the Builder constructor.
const builder = new Builder();

// You can create a new builder instance from existing builder instance by some of it's methods.
const builderWithName = builder.name('another builder instance');
const builderWithObservables = builderWithName.observables({
  x: 1,
  y: { value: 'yyy' },
});
const builderWithComputeds = builderWithObservables.computeds((self) => ({
  doubleX() {
    return self.x * 2;
  },
}));
const builderWithActions = builderWithComputeds.actions((self) => ({
  logX() {
    console.log(self.x);
  },
}));
const builderWithAnnotations = builderWithActions.annotations({
  y: observable.deep,
});
const builderWithOptions = builderWithAnnotations.options({
  proxy: false,
});

// You can specify the name of the builder instance.
// It will be displayed in the console if some builder errors will occure.
const builder1 = builder.name('another builder instance');

// You can specify observable properties
const builder2 = builder1.observables({ x: 1, y: { value: 'yyy' } });

// You can specify computed properties
const builder3 = builder2.computeds((self) => ({
  doubleX() {
    return self.x * 2;
  },
}));

// You can specify action methods
const builder4 = builder3.actions((self) => ({
  logX() {
    console.log(self.x);
  },
}));

// You can specify private observable / computed properties and actions methods
// Private properties and methods will be accessible only inside builder instance methods from 'self' argument.
const builderWithPrivateObservables = builder1.privateObservables({
  x: 1,
  y: { value: 'yyy' },
});
const builderWithPrivateComputeds = builder2.privateComputeds((self) => ({
  doubleX() {
    return self.x * 2;
  },
}));
const builderWithPrivateActions = builder4.privateActions((self) => ({
  logX() {
    console.log(self.x);
  },
}));

// You can specify annotations
const builder5 = builder4.annotations({
  y: observable.shallow,
  doubleX: false,
});

// You can specify options that will be passed to the makeAutoObservable function during store creation.
const builder6 = builder5.options({
  proxy: false,
});

// You can create stores from builder instance.
const store1 = builder.create();
const store2 = builder.create();

// For every observable property and you specify, builder will add setter method.
// You should prefer to change property only with setter method and not change it directly.
// You can pass either a value or a function that accepts previous value and returns next value.
const builderWithX = builder.observables({
  x: 1,
  lastValue: null as null | number,
});
const builderWithXActions = builderWithX.actions((self) => ({
  multiplyX(value: number) {
    self.setLastValue(value);
    self.setX((prev) => prev * value);
  },
}));

// For every observable or computed property you specify, builder will add extender method.
// Extender methods can be used to change the value of the property.
// You should pass a function that accepts previous value (as a computed) and returns next value.
const builderWithY = builder.observables({ y: 'yyy' });
const storeWithY = builderWithY.create();
storeWithY.extendY((prev) => `${prev.get()} addition`);

// For every action method you specify, builder will add setter methods.
// You can use setter that allow to override the method entirely.
// Also, you can use 'setBefore' and 'setAfter' methods to extend previous behavior.
const builderWithLog = builder.actions((self) => ({
  log(value: string) {
    console.log(`log value: ${value}`);
  },
}));
const storeWithLog = builderWithLog.create();
// Completely override previous method.
storeWithLog.setLog(() => (value) => console.log(`new log value: ${value}`));
// Extend previous method.
storeWithLog.setLog((prev) => (...args) => {
  console.log(`new log value: ${prev(...args)}`);
  prev(...args);
});
// Shorthand for previous example.
storeWithLog.setBeforeLog((value) => console.log(`before log value: ${value}`));
// Same as previous example, but executed after the 'prev' method.
storeWithLog.setAfterLog((value) => console.log(`after log value: ${value}`));
