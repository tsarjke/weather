import { mount } from '@vue/test-utils';
import Switch from '@/components/UI/Switch/Switch.vue';

describe('Switch component', () => {
  it('should render switch with the light mode by default', () => {
    const wrapper = mount(Switch);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input.light').exists()).toBe(true);
  });
  it('should render switch with the dark mode by props', () => {
    const wrapper = mount(Switch, {
      props: { mode: 'dark' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input.dark').exists()).toBe(true);
  });
  it('should render switch with the light (not dark) mode when it is strange props value', () => {
    const wrapper = mount(Switch, {
      props: { mode: 'mistakenMode' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input.light').exists()).toBe(true);
    expect(wrapper.find('input.dark').exists()).toBe(false);
  });
  it('should change mode by click', async () => {
    const wrapper = mount(Switch);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    const switchBtn = wrapper.find('input.light');
    await switchBtn.setValue(true);
    expect(wrapper.find('input.dark').exists()).toBe(true);
  });
  it('should not change mode by click when disabled', async () => {
    const wrapper = mount(Switch, {
      props: { disabled: true },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    const switchBtn = wrapper.find('input.light');
    await switchBtn.setValue(true);
    expect(wrapper.find('input.dark').exists()).toBe(false);
  });
});
