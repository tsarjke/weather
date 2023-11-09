import { mount } from '@vue/test-utils';
import ForecastCard from '@/components/ForecastCard/ForecastCard.vue';

const testForecastData = [
  {
    date_epoch: 1699488000, // 2023-11-09T00:00:00.000Z
    day: {
      maxtemp_c: 25,
      mintemp_c: 20,
      condition: {
        code: 1000,
        text: 'Clear sky',
      },
    },
  },
  {
    date_epoch: 1699574400, // 2023-11-10T00:00:00.000Z
    day: {
      maxtemp_c: 24,
      mintemp_c: 21,
      condition: {
        code: 1003,
        text: 'Few clouds',
      },
    },
  },
];

describe('ForecastCard component', () => {
  it('should render the ForecastCard (with all elements of the array) with all the data (temp, week day, icon)', () => {
    const wrapper = mount(ForecastCard, {
      props: {
        data: testForecastData,
      },
    });
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.findAll('.forecast-card__temp_max')[0].text()).toBe('25ºc');
    expect(wrapper.findAll('.forecast-card__temp_min')[1].text()).toBe('21ºc');
    expect(wrapper.findAll('.forecast-card__icon')[0].exists()).toBe(true);
    expect(wrapper.findAll('.forecast-card__icon img')[1].exists()).toBe(true);
    expect(wrapper.findAll('.forecast-card__weekday')[1].text()).toBe('Fri');
  });
});
