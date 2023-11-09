import { mount } from '@vue/test-utils';
import CurrentWeatherCard from '@/components/CurrentWeatherCard/CurrentWeatherCard.vue';

const testWeatherCardData = {
  current: {
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
  },
  location: {
    name: 'Testcity',
    region: 'Test',
    country: 'Test Republic',
    lat: 10,
    lon: 20,
    tz_id: 'Europe/London',
    localtime_epoch: 1699574400, // 2023-11-10T00:00:00.000Z
  },
};

describe('CurrentWeatherCard component', () => {
  it('should render the CurrentWeatherCard with all the data (location, data, time, temp and icon with condition text)', () => {
    const wrapper = mount(CurrentWeatherCard, {
      props: {
        data: testWeatherCardData,
      },
    });
    expect(wrapper.exists()).toBe(true);
    const dateHeader = wrapper.find('.header__date');
    const timeHeader = wrapper.find('.header__time');
    const valueBlock = wrapper.find('.temp__value');
    const iconBlock = wrapper.find('.temp__icon');
    expect(dateHeader.find('.header__title').text()).toBe('Testcity - Test Republic');
    expect(dateHeader.find('.header__subtitle').text()).toBe('Friday, 10.11.2023');
    expect(timeHeader.find('.header__subtitle').text()).toBe('00:00');
    expect(valueBlock.find('.temp__current').text()).toBe('23ºc');
    expect(valueBlock.find('.temp__feels-like').text()).toBe('feels like 25ºc');
    expect(iconBlock.find('img').exists()).toBe(true);
    expect(iconBlock.find('p').text()).toBe('Clear sky');
  });
});
