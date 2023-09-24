<template>
  <section class="main" :class="{'initial': !selectedOption}">
    <div v-if="!selectedOption" class="greeting">
      <h1 class="greeting__title">
        Welcome to <span class="greeting__highlight">Weather App</span>
      </h1>
      <p class="greeting__subtitle">Choose a location to see the weather forecast</p>
    </div>
    <TextInput v-model="selectedOption" :list="formattedList" @inputValue="getLocations"/>
    <div v-if="selectedOption" class="forecast">
      <LoaderComponent v-if="isForecastLoading" class="loader"/>
      <div v-else-if="forecastError">{{ forecastError }}</div>
      <CurrentWeatherCard v-else :data="forecast"/>
    </div>
  </section>
  <section v-if="selectedOption && !isForecastLoading && !forecastError">
    <CurrentWeatherInfo :data="forecast?.current"/>
  </section>
  <section v-if="selectedOption && !isForecastLoading && !forecastError">
    <ForecastCard :data="forecast?.forecast.forecastday"/>
  </section>
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
import { locationSearch, getForecast } from '@/services';
import { Forecast, InputOption } from '@/typings/typings';
import { fetchData, getOptionsFromLocations } from '@/helpers';

export default defineComponent({
  name: 'App',
  components: {
    ForecastCard,
    CurrentWeatherInfo,
    LoaderComponent,
    CurrentWeatherCard,
    TextInput,
  },
  setup() {
    const formattedList: Ref<InputOption[]> = ref([]);
    const selectedOption: Ref<InputOption | undefined> = ref();
    const forecast: Ref<Forecast | undefined> = ref();

    const [getLocations, isLocationLoading, locationError] = fetchData(
      async (value: string) => {
        if (value) {
          formattedList.value = getOptionsFromLocations(await locationSearch(value));
        }
      },
    );

    const [testForecast, isForecastLoading, forecastError] = fetchData(
      async (value: string) => {
        forecast.value = await getForecast(value);
      },
    );

    watch(selectedOption, (option: InputOption | undefined) => {
      if (option?.value) {
        testForecast(String(option?.value));
      }
    });

    return {
      formattedList,
      selectedOption,
      getLocations,
      forecast,
      isForecastLoading,
      forecastError,
    };
  },
});
</script>

<style lang="scss">
#app {
  padding: 1.5rem;
  height: 100%;
  background: url("@/assets/img/background_dark.jpg");
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: flex-end;
  }

  .main.initial {
    justify-content: flex-end;
    gap: 3rem;
    height: 50%;
  }

  section:not(.initial) {
    background: #16161F;
    border-radius: 1.2rem;
    padding: 1rem;
  }

  .greeting {
    &__title {
      padding: 0.5rem 0;
      color: #FAFAFA;
      text-align: center;
      font-size: 2.4rem;
      font-weight: 700;
      line-height: 2.8rem
    }

    &__highlight {
      color: #8FB2F5;
    }

    &__subtitle {
      color: #BFBFD4;
      text-align: center;
      font-size: 1.6rem;
      line-height: 2rem;
    }
  }
}
</style>
