import Errors from '../src/Errors.js';

let errors;

describe('Errors class', () => {

  beforeEach(() => {
    errors = new Errors();
  });

  it('has no errors by default', () => {
    expect(errors.any()).toBe(false);
    expect(errors.all()).toEqual({});
  });

  it('can accept errors from constructor', () => {

  })

});
