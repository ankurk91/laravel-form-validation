import {mount, createLocalVue} from '@vue/test-utils';

import IsInvalidDirective from "../src/Vue/IsInvalidDirective.js";
import Errors from "../src/Errors.js";

const localVue = createLocalVue()
localVue.directive('invalid', IsInvalidDirective)

const InputComponent = {
  name: 'EmailInput',
  render(el) {
    return el('input', {
      domProps: {
        name: 'email',
        type: 'email'
      },
      directives: [{
        name: 'invalid',
        value: new Errors({
          email: ['Email is required']
        })
      }]
    })
  }
};

describe('Is-Invalid Directive', () => {

  test('can add class to input', async () => {
    const wrapper = mount(InputComponent, {
      localVue
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.classes('is-invalid')).toBe(true);
  });

});
