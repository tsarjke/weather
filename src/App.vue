<template>
  <LoaderComponent v-if="isForecastLoading" class="loader content"/>
  <div class="error content" v-else-if="forecastError">{{ forecastError }}</div>
  <div v-else class="content" :class="{'initial': !selectedOption}">
    <section class="content__main" :class="{'initial': !selectedOption}">
      <div v-if="!selectedOption" class="content__greeting greeting">
        <h1 class="greeting__title">
          Welcome to <span class="greeting__highlight">Weather App</span>
        </h1>
        <p class="greeting__subtitle">Choose a location to see the weather forecast</p>
      </div>
      <div class="greeting__control" :class="{'initial': !selectedOption}">
        <SwitchButton class="switch" :mode="colorTheme" @change="toggleTheme"/>
        <TextInput v-model="selectedOption"
                   :list="locationOptions"
                   @inputValue="getLocations"/>
      </div>
      <div v-if="selectedOption" class="content__forecast">
        <CurrentWeatherCard class="weather-card" :data="currentWeatherData"/>
      </div>
    </section>
    <div class="content__info" v-if="selectedOption && !isForecastLoading && !forecastError">
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
  defineComponent, onMounted, ref, Ref, watch,
} from 'vue';
import TextInput from '@/components/UI/TextInput/TextInput.vue';
import SwitchButton from '@/components/UI/Switch/Switch.vue';
import CurrentWeatherCard from '@/components/CurrentWeatherCard/CurrentWeatherCard.vue';
import CurrentWeatherInfo from '@/components/CurrentWeatherInfo/CurrentWeatherInfo.vue';
import ForecastCard from '@/components/ForecastCard/ForecastCard.vue';
import LoaderComponent from '@/components/UI/Loader/Loader.vue';
import PageFooter from '@/components/Footer/Footer.vue';
import { ColorTheme, InputOption } from '@/typings/typings';
import { useLocationStore, useWeatherStore } from '@/stores';
import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'App',
  components: {
    SwitchButton,
    PageFooter,
    ForecastCard,
    CurrentWeatherInfo,
    LoaderComponent,
    CurrentWeatherCard,
    TextInput,
  },
  setup() {
    const selectedOption: Ref<InputOption | undefined> = ref();
    const colorTheme: Ref<string> = ref('');
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

    onMounted(() => {
      colorTheme.value = localStorage.getItem('colorTheme') || ColorTheme.dark;
      document.documentElement.className = colorTheme.value;
    });

    watch(selectedOption, (option: InputOption | undefined) => {
      if (option?.value) {
        getWeather(String(option?.value));
      }
    });

    const toggleTheme = (value: string) => {
      colorTheme.value = value;
      localStorage.setItem('colorTheme', value);
      document.documentElement.className = value;
    };

    return {
      selectedOption,
      currentWeatherData,
      weatherForecast,
      isForecastLoading,
      forecastError,
      getLocations,
      locationOptions,
      toggleTheme,
      colorTheme,
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/style/mixins';

#app {
  @include adaptive-prop('padding', 1.5, 4.5);
  min-height: 100%;
  background: var(--background-image);
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
</style>
