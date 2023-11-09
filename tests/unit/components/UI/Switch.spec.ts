import { mount } from '@vue/test-utils';
import Switch from '@/components/UI/Switch/Switch.vue';

describe('Switch component', () => {
  it('should render switch with the dark mode by default', () => {
    const wrapper = mount(Switch);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input.dark').exists()).toBe(true);
  });
  it('should render switch with the light mode by props', () => {
    const wrapper = mount(Switch, {
      props: { mode: 'light' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input.light').exists()).toBe(true);
  });
  it('should render switch with the dark (not light) mode when it is strange props value', () => {
    const wrapper = mount(Switch, {
      props: { mode: 'mistakenMode' },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input.dark').exists()).toBe(true);
    expect(wrapper.find('input.light').exists()).toBe(false);
  });
  it('should change mode on props changing', async () => {
    const wrapper = mount(Switch);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    await wrapper.setProps({ mode: 'light' });
    expect(wrapper.find('input.light').exists()).toBe(true);
  });
  it('should emit new mode value on "click"', async () => {
    const wrapper = mount(Switch, {
      props: { disabled: true },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('input').exists()).toBe(true);
    wrapper.vm.switchTheme(new Event('change'));
    expect(wrapper.emitted()).toHaveProperty('change');
  });
});
