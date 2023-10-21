<template>
  <LoaderComponent v-if="isForecastLoading" class="loader content"/>
  <div class="error content" v-else-if="forecastError">{{ forecastError }}</div>
  <div v-else class="content" :class="{'initial': !selectedOption}">
    <section class="content__main main" :class="{'initial': !selectedOption}">
      <div v-if="!selectedOption" class="content__greeting greeting">
        <h1 class="greeting__title">
          Welcome to <span class="greeting__highlight">Weather App</span>
        </h1>
        <p class="greeting__subtitle">Choose a location to see the weather forecast</p>
      </div>
      <TextInput v-model="selectedOption"
                 :list="locationOptions"
                 @inputValue="getLocations"/>
      <div v-if="selectedOption" class="content__forecast forecast">
        <CurrentWeatherCard class="weather-card" :data="currentWeatherData"/>
      </div>
    </section>
    <div class="content__info info" v-if="selectedOption && !isForecastLoading && !forecastError">
      <section>
        <CurrentWeatherInfo :data="currentWeatherData.current"/>
      </section>
      <section>
        <ForecastCard :data="weatherForecast"/>
      </section>
    </div>
  </div>
  <footer>
    <PageFooter/>
  </footer>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref, watch,
} from 'vue';
import TextInput from '@/components/UI/TextInput/TextInput.vue';
import CurrentWeatherCard from '@/components/CurrentWeatherCard/CurrentWeatherCard.vue';
import CurrentWeatherInfo from '@/components/CurrentWeatherInfo/CurrentWeatherInfo.vue';
import ForecastCard from '@/components/ForecastCard/ForecastCard.vue';
import LoaderComponent from '@/components/UI/Loader/Loader.vue';
import PageFooter from '@/components/Footer/Footer.vue';
import { InputOption } from '@/typings/typings';
import { useLocationStore, useWeatherStore } from '@/stores';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'App',
  components: {
    PageFooter,
    ForecastCard,
    CurrentWeatherInfo,
    LoaderComponent,
    CurrentWeatherCard,
    TextInput,
  },
  setup() {
    const selectedOption: Ref<InputOption | undefined> = ref();
    const locationStore = useLocationStore();
    const weatherStore = useWeatherStore();

    const { locationOptions } = storeToRefs(locationStore);
    const { getLocations } = locationStore;

    const {
      currentWeatherData,
      weatherForecast,
      isForecastLoading,
      forecastError,
    } = storeToRefs(weatherStore);
    const { getWeather } = weatherStore;

    watch(selectedOption, (option: InputOption | undefined) => {
      if (option?.value) {
        getWeather(String(option?.value));
      }
    });

    return {
      selectedOption,
      currentWeatherData,
      weatherForecast,
      isForecastLoading,
      forecastError,
      getLocations,
      locationOptions,
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/style/mixins';

#app {
  @include adaptive-prop('padding', 1.5, 4.5);
  min-height: 100%;
  background: url("@/assets/img/background_dark.jpg");
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
