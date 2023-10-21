import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { fetchData } from '@/helpers';
import { getWeatherData } from '@/services';
import { Forecast } from '@/typings/typings';

export default defineStore('weatherStore', () => {
  const weather: Ref<Forecast | undefined> = ref();

  const currentWeatherData = computed(() => ({
    current: weather.value?.current,
    location: weather.value?.location,
  }));
  const weatherForecast = computed(() => weather.value?.forecast.forecastday);

  const [getWeather, isForecastLoading, forecastError] = fetchData(
    async (value: string) => {
      weather.value = await getWeatherData(value);
    },
  );

  return {
    currentWeatherData, weatherForecast, getWeather, isForecastLoading, forecastError,
  };
});
