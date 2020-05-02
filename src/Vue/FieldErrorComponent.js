export default {
  name: 'FieldError',
  render(el) {
    return this.hasError ? el('div', {
      class: this.className,
      domProps: {
        innerText: this.message
      },
    }) : null
  },
  props: {
    bag: {
      type: Object,
      required: true,
    },
    field: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: 'invalid-feedback'
    }
  },
  computed: {
    hasError() {
      return this.bag.has(this.field)
    },
    message() {
      return this.bag.first(this.field)
    }
  }
}

