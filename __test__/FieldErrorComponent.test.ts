import {mount, Wrapper} from '@vue/test-utils';

import FieldErrorComponent from "../src/Vue/FieldErrorComponent";
import Errors from "../src/Errors";

describe('Field Error Component', () => {

  let wrapper: Wrapper<any>;

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
    wrapper.destroy();
  });

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBe(true)
  });

  test('can shows message', () => {
    expect(wrapper.classes('invalid-feedback')).toBe(true);
    expect(wrapper.vm.$el.innerText).toEqual('Email is required');
  });

  test('does not shows message', async () => {
    wrapper.setProps({field: 'alien_field'});
    await wrapper.vm.$nextTick();

    expect(wrapper.vm.$el.innerText).toBeUndefined();
  });
});
