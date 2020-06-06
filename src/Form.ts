import axios, {AxiosError, AxiosRequestConfig, AxiosResponse, Method} from 'axios';
import Errors from './Errors';
import {hasFile} from "./Util";
import {objectToFormData} from 'object-to-formdata';

class Form {

  public static $defaults: Object | any;
  public $progress: Number;
  public $pending: Boolean;
  public $errors: Errors;

  /**
   * Create a new Form instance.
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
  get(url: string, params: Object = {}): Promise<any> {
    return this.submit('get', url, {}, {params});
  }

  /**
   * Make a post request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  post(url: string, data: Object = {}): Promise<any> {
    return this.submit('post', url, data);
  }

  /**
   * Make a patch request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  patch(url: string, data: Object = {}): Promise<any> {
    return this.submit('patch', url, data);
  }

  /**
   * Make a put request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  put(url: string, data: Object = {}): Promise<any> {
    return this.submit('put', url, data);
  }

  /**
   * Make a delete request.
   *
   * @param {String} url
   * @param {Object} data
   * @returns {Promise}
   */
  delete(url: string, data: Object = {}): Promise<any> {
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
  submit(method: string, url: string, data: any = {}, config: AxiosRequestConfig = {}): Promise<any> {
    let formData = data;
    method = method.toLowerCase();

    this.$progress = 0;
    this.$errors.clear();
    this.$pending = true;

    if (hasFile(formData)) {
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
      Form.$defaults.axios.request({
        url,
        method,
        data: formData,
        ...this.axiosConfig(), ...config
      })
        .then((response: AxiosResponse) => {
          resolve(response.data);
        })
        .catch((error: AxiosError) => {
          this.onFail(error);
          reject(error);
        })
        .then(() => this.$pending = false);
    });
  }

  /**
   * Returns the axios configuration object.
   *
   * @source https://github.com/axios/axios#request-config
   * @return {Object}
   */
  axiosConfig(): AxiosRequestConfig {
    return {
      onUploadProgress: (event: any) => {
        this.$progress = Math.round((event.loaded * 100) / event.total);
      }
    }
  }

  /**
   * Handle a error response.
   *
   * @param  {AxiosError} error
   */
  onFail(error: AxiosError) {
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
