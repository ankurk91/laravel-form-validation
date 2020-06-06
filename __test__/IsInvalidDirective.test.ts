import {mount, createLocalVue, Wrapper} from '@vue/test-utils';
import Vue, {VNode} from "vue";

import IsInvalidDirective from "../src/Vue/IsInvalidDirective";
import Errors from "../src/Errors";

const localVue = createLocalVue()
localVue.directive('invalid', IsInvalidDirective)

const InputComponent = Vue.extend({
  name: 'EmailInput',
  data() {
    return {
      errors: new Errors({
        email: ['Email is required']
      })
    }
  },
  render(el): VNode {
    return el('input', {
      domProps: {
        name: 'email',
        type: 'email'
      },
      directives: [{
        name: 'invalid',
        value: this.errors
      }]
    })
  }
});

describe('Is-Invalid Directive', () => {

  test('can add/remove class to input', async () => {
    const wrapper: Wrapper<any> = mount(InputComponent, {
      localVue
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('is-invalid')).toBe(true);

    wrapper.vm.errors.clear();
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('is-invalid')).toBe(false);
  });

});
