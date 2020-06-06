import Vue, {VNode, PropType} from 'vue'
import Errors from "../Errors";

export default Vue.extend({
  name: 'FieldError',
  render(el: any): VNode {
    return this.hasError ? el('div', {
      class: this.className,
      domProps: {
        innerText: this.message
      },
    }) : null
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

