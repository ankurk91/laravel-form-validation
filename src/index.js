import Form from './Form.js';
import Errors from './Errors.js'
import FieldErrorComponent from "./Vue/FieldErrorComponent.js";
import IsInvalidDirective from "./Vue/IsInvalidDirective.js";

const VueFormPlugin = {
  install(Vue, options) {
    Vue.directive('invalid', IsInvalidDirective);
    Vue.component(FieldErrorComponent.name, FieldErrorComponent);
  }
}

export {
  Form,
  Form as default,
  Errors,
  FieldErrorComponent,
  IsInvalidDirective,
  VueFormPlugin
}
