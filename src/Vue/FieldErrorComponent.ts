import {h, defineComponent, PropType} from 'vue'
import Errors from '../Errors';

export default defineComponent({
  name: 'FieldError',
  render() {
    return this.hasError ? h('div', {
      class: this.className
    },`${this.message}`) : null
  },
  props: {
    bag: {
      type: Object as PropType<Errors>,
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
    hasError(): Boolean {
      return this.bag.has(this.field)
    },
    message(): String | null {
      return this.bag.first(this.field)
    }
  }
})

