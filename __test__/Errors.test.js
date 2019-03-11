import Errors from '../src/Errors.js';

let $errors;

describe('Errors class', () => {

  beforeEach(() => {
    $errors = new Errors();
  });

  it('has no errors by default', () => {
    expect($errors.any()).toBe(false);
    expect($errors.all()).toEqual({});
  });

  it('can accept errors via constructor', () => {
    const errors = {
      name: ['Name is required']
    };

    expect((new Errors(errors)).all()).toEqual(errors)
  });

  it('can accept errors via record()', () => {
    const errors = {
      name: ['Name is required']
    };
    $errors.record(errors);

    expect($errors.all()).toEqual(errors)
  });

  it('can clear() all errors', () => {
    const errors = {
      name: ['Name is required']
    };
    $errors.record(errors);
    $errors.clear();

    expect($errors.all()).toEqual({})
  });

  it('can clear() all errors for given field', () => {
    const errors = {
      name: ['Name is required'],
      email: ['Email is required'],
    };
    $errors.record(errors);
    $errors.clear('name');

    expect($errors.has('name')).toBe(false);
    expect($errors.has('email')).toBe(true);
    expect($errors.get('email')).toEqual(errors.email);
  });

  it('can determine if a given field or object has() any errors', () => {
    expect($errors.any()).toBe(false);

    $errors.record({
      first_name: ['Field is required'],
      'person.0.first_name': ['Field is required'],
    });

    expect($errors.has('first')).toBe(false);
    expect($errors.has('first_name')).toBe(true);
    expect($errors.has('person')).toBe(true);
  });

  it('can get() all errors for given field', () => {
    const allErrors = {first_name: ['Field is required']};

    $errors.record(allErrors);

    expect($errors.get('first_name')).toEqual(allErrors.first_name);
    expect($errors.get('unknown_field')).toEqual([]);
  });

  it('can get first() error for the given field', () => {
    $errors.record({first_name: ['Field is required']});

    expect($errors.first('first_name')).toEqual('Field is required');
  });

  it('can clear() all errors of the given key having a dot (.) or [', () => {
    $errors.record({
      'profile.first_name': ['Field is required'],
      'profile.last_name': ['Field is required'],
      'dates.0.start_date': ['Field is required'],
      'dates.1.start_date': ['Field is required'],
      'roles[0].name': ['Field is required'],
      'roles[1].name': ['Field is required'],
    });

    $errors.clear('profile');
    $errors.clear('dates.0');
    $errors.clear('roles[1]');

    expect($errors.has('profile')).toBe(false);
    expect($errors.has('profile.first_name')).toBe(false);
    expect($errors.has('profile.last_name')).toBe(false);

    expect($errors.has('dates')).toBe(true);
    expect($errors.has('dates.0.start_date')).toBe(false);
    expect($errors.has('dates.1.start_date')).toBe(true);

    expect($errors.has('roles')).toBe(true);
    expect($errors.has('roles[0].name')).toBe(true);
    expect($errors.has('roles[1].name')).toBe(false);
  });

});
