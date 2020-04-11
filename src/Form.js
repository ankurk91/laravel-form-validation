import axios from 'axios';
import Errors from './Errors';
import {objectToFormData} from 'object-to-formdata';

class Form {
  /**
   * Create a new Form instance.
   *
   * @return {Form}
   */
  constructor() {
    this.$progress = 0;
    this.$pending = false;
    this.$errors = new Errors();
  }

  /**
   * Make a get request.
   *
   * @param {String} url
   * @param {Object} params
   * @returns {Promise}
   */
  get(url, params = {}) {
    return this.submit('get', url, {}, {params});
  }

  /**
   * Make a post request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  post(url, data = {}) {
    return this.submit('post', url, data);
  }

  /**
   * Make a patch request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  patch(url, data = {}) {
    return this.submit('patch', url, data);
  }

  /**
   * Make a put request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  put(url, data = {}) {
    return this.submit('put', url, data);
  }

  /**
   * Make a delete request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  delete(url, data = {}) {
    return this.submit('delete', url, data);
  }

  /**
   * Submit the form to the given URL using the method specified.
   *
   * @param  {String} method
   * @param  {String} url
   * @param  {Object} data
   * @param  {Object} config
   * @return {Promise}
   */
  submit(method, url, data = {}, config = {}) {
    let formData = data;
    method = method.toLowerCase();

    this.$progress = 0;
    this.$errors.clear();
    this.$pending = true;

    if (this.hasFile(formData)) {
      formData = objectToFormData(formData, {
        indices: true,
        booleansAsIntegers: true
      });

      // Form Method Spoofing is needed to send files using PUT/PATCH/DELETE.
      // https://laravel.com/docs/routing#form-method-spoofing
      // https://github.com/laravel/framework/issues/13457
      if (method !== 'post') {
        formData.append('_method', method);
        method = 'post';
      }
    }

    return new Promise((resolve, reject) => {
      Form.$defaults.axios.request({url, method, data: formData, ...this.config(), ...config})
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          this.onFail(error);
          reject(error);
        })
        .then(() => this.$pending = false);
    });
  }

  /**
   * Check if the given data contains any instance of File.
   *
   * @param  {Object} data
   * @return {Boolean}
   */
  hasFile(data) {
    for (let property in data) {
      if (this.hasFileDeep(data[property])) {
        return true;
      }
    }

    return false;
  }

  /**
   * Check if the given item is (or contains) a File.
   *
   * @param  {*} item
   * @return {Boolean}
   */
  hasFileDeep(item) {
    if (item instanceof Blob || item instanceof FileList) {
      return true;
    }

    if (typeof item === 'object') {
      for (let key in item) {
        if (item.hasOwnProperty(key) && this.hasFileDeep(item[key])) {
          return true;
        }
      }
    }

    if (Array.isArray(item)) {
      return item.some(element => this.hasFileDeep(element));
    }

    return false;
  }

  /**
   * Returns the axios configuration object.
   *
   * @source https://github.com/axios/axios#request-config
   * @return {Object}
   */
  config() {
    return {
      onUploadProgress: event => {
        this.$progress = Math.round((event.loaded * 100) / event.total);
      }
    }
  }

  /**
   * Handle a error response.
   *
   * @param  {Object} error
   */
  onFail(error) {
    /* istanbul ignore else */
    if (error.response && error.response.status === 422) {
      this.$errors.record(error.response.data.errors);
    }
  }
}

/*
 * Expose default values in order to let users customize behavior.
 */
Form.$defaults = {axios};

export default Form;
