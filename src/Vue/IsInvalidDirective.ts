import Errors from "../Errors";

export default ($el: any, binding: any) => {
  /**
   * @var Errors $errors
   */
  const $errors: Errors = binding.value;

  if (!$el.attributes.name) {
    throw new Error('v-invalid directive requires `name` attribute on input.')
  }

  if ($errors.has($el.attributes.name.value)) {
    $el.classList.add('is-invalid')
  } else {
    $el.classList.remove('is-invalid')
  }
}
