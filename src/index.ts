import Form from './Form';
import Errors from './Errors'
import FieldErrorComponent from "./Vue/FieldErrorComponent";
import IsInvalidDirective from "./Vue/IsInvalidDirective";
import {VueConstructor} from "vue";

const VueFormPlugin = {
  install(Vue: VueConstructor) {
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
