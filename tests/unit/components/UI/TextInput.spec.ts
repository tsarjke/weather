import { mount } from '@vue/test-utils';
import TextInput from '@/components/UI/TextInput/TextInput.vue';
import { nextTick } from 'vue';
import { InputOption } from '@/typings/typings';

jest.spyOn(window.screen, 'height', 'get').mockReturnValue(700);
jest.spyOn(document.documentElement.style, 'fontSize', 'get').mockReturnValue('10px');

describe('Switch component', () => {
  it('should render empty text-input by default', () => {
    const wrapper = mount(TextInput);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('modelValue')).toBe(undefined);
  });
  it('should render text-input with v-model value from parent', () => {
    const wrapper = mount(TextInput, {
      props: { modelValue: { value: 1, text: 'initialText' } },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('modelValue').text).toBe('initialText');
  });
  it('modelValue should be updated', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: { value: 1, text: 'initialText' },
        'onUpdate:modelValue': (e: InputOption) => wrapper.setProps({ modelValue: e }),
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props('modelValue').text).toBe('initialText');
    await wrapper.setValue({ value: 2, text: 'test' });
    expect(wrapper.props('modelValue').text).toBe('test');
  });
  it('It should render the list with options that match the value in the input', async () => {
    const wrapper = mount(TextInput, {
      props: {
        modelValue: { value: 1, text: 'initialText' },
        'onUpdate:modelValue': (e: InputOption) => wrapper.setProps({ modelValue: e }),
        list: [{ value: 1, text: 'test option' }, { value: 2, text: 'another test option' }],
      },
    });
    expect(wrapper.exists()).toBe(true);
    await wrapper.get('div.dropdown__input').trigger('click');
    await wrapper.get('input.dropdown__input').trigger('focus');
    wrapper.vm.inputValue = 'test o';
    await nextTick();
    expect(wrapper.find('li.dropdown__list-item').text()).toBe('test option');
  });
});
