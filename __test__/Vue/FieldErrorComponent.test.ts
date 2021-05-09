import {mount} from '@vue/test-utils';
import {defineComponent} from 'vue';
import FieldErrorComponent from "../../src/Vue/FieldErrorComponent";
import Errors from "../../src/Errors";

describe('Field Error Component', () => {

  let wrapper: any;

  beforeEach(() => {
    wrapper = mount(FieldErrorComponent, {
      propsData: {
        field: 'email',
        bag: new Errors({
          email: [
            'Email is required'
          ]
        })
      }
    });
  });

  afterEach(() => {
    wrapper.unmount();
  });

  test('shows message on error', () => {
    expect(wrapper.classes()).toContain('invalid-feedback');
    expect(wrapper.text()).toContain('Email is required');
  });

  test('does not shows message', async () => {
    wrapper.setProps({
      field: 'alien_field'
    });
    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toBe('');
  });
});
