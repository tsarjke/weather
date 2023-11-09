import { mount } from '@vue/test-utils';
import CurrentWeatherInfo from '@/components/CurrentWeatherInfo/CurrentWeatherInfo.vue';

const testWeatherInfoData = {
  cloud: 5,
  feelslike_c: 25,
  temp_c: 23,
  is_day: 1 as const,
  wind_kph: 3,
  precip_mm: 0.02,
  humidity: 50,
  wind_degree: 90,
  condition: {
    code: 1000,
    text: 'Clear sky',
  },
};

describe('CurrentWeatherInfo component', () => {
  it('should render the CurrentWeatherInfo with all the data (precipitation, wind speed and direction, humidity and cloud)', () => {
    const wrapper = mount(CurrentWeatherInfo, {
      props: {
        data: testWeatherInfoData,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAll('.weather-info__value')[0].text()).toBe('0.02');
    expect(wrapper.findAll('.weather-info__value')[1].text()).toBe('3');
    expect(window.getComputedStyle(wrapper.find('.icon-arrow').element).getPropertyValue('transform')).toBe('rotate(-90deg)');
    expect(wrapper.findAll('.weather-info__value')[2].text()).toBe('50');
    expect(wrapper.findAll('.weather-info__value')[3].text()).toBe('5');
  });
});
