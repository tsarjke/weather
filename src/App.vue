<template>
  <LoaderComponent v-if="isForecastLoading" class="loader content"/>
  <div class="error content" v-else-if="forecastError">{{ forecastError }}</div>
  <div v-else class="content" :class="{'initial': !selectedOption}">
    <section class="main" :class="{'initial': !selectedOption}">
      <div v-if="!selectedOption" class="greeting">
        <h1 class="greeting__title">
          Welcome to <span class="greeting__highlight">Weather App</span>
        </h1>
        <p class="greeting__subtitle">Choose a location to see the weather forecast</p>
      </div>
      <TextInput v-model="selectedOption"
                 :list="formattedList"
                 @inputValue="getLocationsAndCleanPrevData"/>
      <div v-if="selectedOption" class="forecast">
        <CurrentWeatherCard class="weather-card" :data="forecast"/>
      </div>
    </section>
    <div class="info" v-if="selectedOption && !isForecastLoading && !forecastError">
      <section>
        <CurrentWeatherInfo :data="forecast?.current"/>
      </section>
      <section>
        <ForecastCard :data="forecast?.forecast.forecastday"/>
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
import { locationSearch, getForecast } from '@/services';
import { Forecast, InputOption } from '@/typings/typings';
import { fetchData, getOptionsFromLocations } from '@/helpers';

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
    const formattedList: Ref<InputOption[]> = ref([]);
    const selectedOption: Ref<InputOption | undefined> = ref();
    const forecast: Ref<Forecast | undefined> = ref();

    const [getLocations, isLocationLoading, locationError] = fetchData(
      async (value: string) => {
        formattedList.value = getOptionsFromLocations(await locationSearch(value));
      },
    );

    const getLocationsAndCleanPrevData = (value: string) => {
      if (value) {
        getLocations(value);
      } else {
        formattedList.value = [];
      }
    };

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
      getLocationsAndCleanPrevData,
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
  min-height: 100%;
  background: url("@/assets/img/background_dark.jpg");
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .content {
    flex: 1 0 auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &.initial {
      justify-content: center;
    }

    @media (min-width: 1024px) {
      flex-direction: row;
    }

    .info {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      @media (min-width: 1024px) {
        width: 40%;

        section {
          flex: 1 0 auto;
          display: flex;
          align-items: center;
        }
      }
    }
  }

  .main {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    justify-content: flex-end;

    &.initial {
      gap: 3rem;
      transform: translateY(-50%);
    }

    .forecast {
      flex: 1 0 auto;

      .weather-card {
        height: 100%;
      }
    }

    @media (min-width: 1024px) {
      justify-content: flex-start;
      width: 60%;
      &.initial {
        transform: translateY(0);
        justify-content: center;
        width: 100%;
        padding: 0 25%;
      }
    }
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
