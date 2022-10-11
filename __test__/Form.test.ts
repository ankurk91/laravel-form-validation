import Form from '../src/Form';
import Errors from '../src/Errors';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

let $form: Form;
let $mockAdapter: MockAdapter;

describe('Form class', () => {

  beforeEach(() => {
    $form = new Form();
    $mockAdapter = new MockAdapter(axios);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('has default values', () => {
    expect($form.$pending).toBe(false);
    expect($form.$progress).toEqual(0);
    expect($form.$errors).toBeInstanceOf(Errors);
  });

  it('can record the errors sent by server', async () => {
    $mockAdapter.onPost('http://localhost/signup')
      .reply(422, {
        errors: {first_name: ['Field is required']},
      });

    try {
      await $form.post('http://localhost/signup');
    } catch (e: any) {
      expect(e.response.status).toBe(422)
    }

    expect($form.$errors.has('first_name')).toBe(true);
  });

  it('transforms the data to a FormData object if there is a File', async () => {
    const file = new File([new Uint8Array(10000)], 'test.png');

    const data = {
      email: 'john@example.com',
      profile: {
        name: 'John D',
        roles: ['admin', 'coach'],
        dob: new Date(Date.UTC(2019, 5, 22, 5, 15)),
      },
      avatar: file,
      level: null
    };

    $mockAdapter.onPost('http://localhost/profile')
      .reply((request: any) => {
        expect(request.data).toBeInstanceOf(FormData);
        expect(request.data.get('email')).toBe('john@example.com');
        expect(request.data.get('profile[name]')).toBe('John D');
        expect(request.data.get('profile[roles][0]')).toBe('admin');
        expect(request.data.get('profile[roles][1]')).toBe('coach');
        expect(request.data.get('profile[dob]')).toBe('2019-06-22T05:15:00.000Z');
        expect(request.data.get('avatar')).toEqual(file);

        // Convert null to empty string
        expect(request.data.get('level')).toEqual("");
        // Form method spoofing
        expect(request.data.get('_method')).toEqual('put');

        expect(request.url).toBe('http://localhost/profile');
        expect(request.onUploadProgress).toBeInstanceOf(Function);

        return [200, {}];
      });

    await $form.put('http://localhost/profile', data);
  });

  it('can directly call get() method', () => {
    const stub = jest.fn();
    $form.submit = stub;

    $form.get("http://localhost", {search: "test"});
    expect(stub).toHaveBeenCalledWith("get", "http://localhost", {}, {params: {search: "test"}});
  });

  it('can directly call post() method', () => {
    const stub = jest.fn();
    $form.submit = stub;

    $form.post("http://localhost", {foo: "bar"});
    expect(stub).toHaveBeenCalledWith("post", "http://localhost", {foo: "bar"});
  });

  it('can directly call put() method', () => {
    const stub = jest.fn();
    $form.submit = stub;

    $form.put("http://localhost", {name: "test"});
    expect(stub).toHaveBeenCalledWith("put", "http://localhost", {name: "test"});
  });

  it('can directly call patch() method', () => {
    const stub = jest.fn();
    $form.submit = stub;

    $form.patch("http://localhost", {name: "test"});
    expect(stub).toHaveBeenCalledWith("patch", "http://localhost", {name: "test"});
  });

  it('can directly call delete() method', () => {
    const stub = jest.fn();
    $form.submit = stub;

    $form.delete("http://localhost", {slug: "test"});
    expect(stub).toHaveBeenCalledWith("delete", "http://localhost", {slug: "test"});
  });

});
