import Builder from '../Builder';

describe('Check builder instance creation', () => {
  it('should create an empty builder', () => {
    const builder = new Builder();
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with a name', () => {
    const builder = new Builder().name('test');
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with an observable', () => {
    const builder = new Builder().observables({ test: 'test' });
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with a private observables', () => {
    const builder = new Builder().privateObservables({ test: 'test' });
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with a computed', () => {
    const builder = new Builder().computeds(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with a private computeds', () => {
    const builder = new Builder().privateComputeds(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with an action', () => {
    const builder = new Builder().actions(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with a private action', () => {
    const builder = new Builder().privateActions(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder).toBeInstanceOf(Builder);
  });
  it('should create a builder with an annotation', () => {
    const builder = new Builder()
      .observables({ test: 'test' })
      .annotations({ test: false });
    expect(builder).toBeDefined();
  });
  it('should create a builder with an options', () => {
    const builder = new Builder().options({ proxy: false });
    expect(builder).toBeInstanceOf(Builder);
  });
});
