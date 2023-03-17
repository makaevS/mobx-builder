import Builder from '../Builder';

describe('Check builder instance creation is consistent', () => {
  it('should create a new instance of the builder with name', () => {
    const builder1 = new Builder();
    const builder2 = builder1.name('test');
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with observables', () => {
    const builder1 = new Builder();
    const builder2 = builder1.observables({ test: 'test' });
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with private observables', () => {
    const builder1 = new Builder();
    const builder2 = builder1.privateObservables({ test: 'test' });
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with computeds', () => {
    const builder1 = new Builder();
    const builder2 = builder1.computeds(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with private computeds', () => {
    const builder1 = new Builder();
    const builder2 = builder1.privateComputeds(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with actions', () => {
    const builder1 = new Builder();
    const builder2 = builder1.actions(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with private actions', () => {
    const builder1 = new Builder();
    const builder2 = builder1.privateActions(() => ({
      test() {
        return 'test';
      },
    }));
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with annotations', () => {
    const builder1 = new Builder();
    const builder2 = builder1
      .observables({ test: 'test' })
      .annotations({ test: false });
    expect(builder1).not.toBe(builder2);
  });
  it('should create a new instance of the builder with options', () => {
    const builder1 = new Builder();
    const builder2 = builder1.options({ proxy: false });
    expect(builder1).not.toBe(builder2);
  });
});
