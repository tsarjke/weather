import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer/Footer.vue';

describe('Footer component', () => {
  it('should render the footer with link-icons', () => {
    const wrapper = mount(Footer);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('a.footer__link').exists()).toBe(true);
    expect(wrapper.find('a.footer__link img').exists()).toBe(true);
  });
});
