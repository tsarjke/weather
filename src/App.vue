<template>
  <div class="wrapper">
    <div class="greeting">
      <h1 class="greeting__title">Welcome to <span class="greeting__highlight">Weather App</span>
      </h1>
      <p class="greeting__subtitle">Choose a location to see the weather forecast</p>
    </div>
    <TextInput v-model="selectedOption" :list="formattedList" @inputValue="getLocations"/>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, ref, Ref, watch,
} from 'vue';
import TextInput from '@/components/UI/TextInput/TextInput.vue';
import { locationSearch, getForecast } from '@/services';
import { Forecast, InputOption, Location } from '@/typings/typings';
import { fetchData } from '@/helpers/helpers';

export default defineComponent({
  name: 'App',
  components: {
    TextInput,
  },
  setup() {
    const formattedList: Ref<InputOption[] | undefined> = ref([]);
    const selectedOption: Ref<InputOption | undefined> = ref();
    const forecast: Ref<Forecast | undefined> = ref();

    const handleLocation = (loc: Location[]) => loc.map(({
      name, region, country, lat, lon,
    }) => ({ text: `${name}${region && ` - ${region}`} - ${country}`, value: `${lat},${lon}` }));

    const getLocations = async (value: string) => {
      const res = await fetchData<Location[], string>(locationSearch, value);
      formattedList.value = res ? handleLocation(res) : [];
    };

    const testForecast = async (value: string) => {
      forecast.value = await fetchData<Forecast, string>(getForecast, value) as Forecast;
    };

    watch(selectedOption, (option: InputOption | undefined) => {
      testForecast(String(option?.value));
    });

    return {
      formattedList,
      selectedOption,
      getLocations,
      forecast,
    };
  },
});
</script>

<style lang="scss">
#app {
  padding: 3.2rem;
  height: 100%;
  background: url("@/assets/img/background_dark.jpg");

  .wrapper {
    height: 50%;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    align-items: center;
    justify-content: flex-end;
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
      line-height: 2rem; /* 19.6px */
    }
  }
}
</style>
