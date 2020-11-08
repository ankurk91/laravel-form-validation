import Form from './Form';
import Errors from './Errors'
import FieldErrorComponent from "./Vue/FieldErrorComponent";
import IsInvalidDirective from "./Vue/IsInvalidDirective";
import {App} from "vue";

const VueFormPlugin = {
  install(Vue: App) {
    Vue.directive('invalid', IsInvalidDirective);
    Vue.component('field-error', FieldErrorComponent);
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
