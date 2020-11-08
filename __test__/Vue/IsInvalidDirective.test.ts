import {mount} from '@vue/test-utils';
import {h, defineComponent, resolveDirective, withDirectives, Directive} from "vue";

import IsInvalidDirective from "../../src/Vue/IsInvalidDirective";
import Errors from "../../src/Errors";

const InputComponent = defineComponent({
  name: 'EmailInput',
  render() {
    const invalid = resolveDirective('invalid')

    const input = h('input', {
      name: 'email',
      type: 'email',
      class: ['form-control'],
    });

    return withDirectives(input, [
      [invalid as Directive, this.errors]
    ]);
  },
  data() {
    return {
      errors: new Errors({
        email: ['Email is required']
      })
    }
  },
  directives: {},
});

describe('Is-Invalid Directive', () => {

  test('can add/remove class to input', async () => {
    const wrapper = mount(InputComponent, {
      global: {
        directives: {
          'invalid': IsInvalidDirective
        }
      }
    });

    await wrapper.vm.$nextTick();
    expect(wrapper.classes()).toContain('is-invalid');

    wrapper.vm.errors.clear();
    //todo can we skip forceUpdate here?
    wrapper.vm.$forceUpdate();
    await wrapper.vm.$nextTick();
    expect(wrapper.classes().includes('is-invalid')).toBeFalsy();
  });

});
