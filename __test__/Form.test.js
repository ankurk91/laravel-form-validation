import Form from '../src/Form.js';
import Errors from '../src/Errors.js';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let form;
let mockAdapter;

describe('Form class', () => {

  beforeEach(() => {
    form = new Form();
    mockAdapter = new MockAdapter(axios);
  });

  it('has default values', () => {
    expect(form.$pending).toBe(false);
    expect(form.$progress).toEqual(0);
    expect(form.$errors).toBeInstanceOf(Errors);
  })

});
