<template>
  <div class="weather-info">
    <ul>
      <li v-for="item in currentCondition" :key="item.text" class="weather-info__item item">
        <div class="weather-info__icon">
          <img :src="item.icon" alt="item.text">
        </div>
        <p class="weather-info__text">{{ item.text }}</p>
        <div v-if="item.iconValue">
          <img :src="item.iconValue" :alt="item.value"
               :style="{transform: `rotate(${item.value - 180}deg)`}">
        </div>
        <p v-else class="weather-info__value">{{ item.value }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { CurrentWeather } from '@/typings/typings';
import precipIcon from '@/assets/img/icons/condition/precip.svg';
import windSpeedIcon from '@/assets/img/icons/condition/wind-speed.svg';
import windDirIcon from '@/assets/img/icons/condition/wind-dir.svg';
import humidityIcon from '@/assets/img/icons/condition/humidity.svg';
import cloudIcon from '@/assets/img/icons/condition/cloud.svg';
import windDirArrowIcon from '@/assets/img/icons/condition/arrow.svg';

export default defineComponent({
  name: 'CurrentWeatherInfo',
  props: {
    data: Object as () => CurrentWeather,
  },
  setup(props) {
    const currentCondition = computed(() => [
      {
        text: 'Precipitation (mm)', value: props.data?.precip_mm, icon: precipIcon,
      },
      {
        text: 'Wind speed (km/h)', value: props.data?.wind_kph, icon: windSpeedIcon,
      },
      {
        text: 'Wind direction',
        value: props.data?.wind_degree,
        icon: windDirIcon,
        iconValue: windDirArrowIcon,
      },
      {
        text: 'Humidity (%)', value: props.data?.humidity, icon: humidityIcon,
      },
      {
        text: 'Cloud (%)', value: props.data?.cloud, icon: cloudIcon,
      },
    ]);

    return {
      currentCondition,
    };
  },
});
</script>

<style lang="scss">
.weather-info {
  width: 100%;

  &__item {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    padding: 1rem;

    &:not(:last-child) {
      border-bottom: 1px solid #1C1C27;
    }
  }

  &__icon {
    width: 2.5rem;
    height: 2.5rem;

    img {
      height: 100%;
      width: 100%;
    }
  }

  &__text {
    flex: 1 0 auto;
    color: #BFBFD4;
    font-size: 1.4rem;
    font-weight: 700;
  }

  &__value {
    color: #FAFAFA;
    font-size: 1.6rem;
  }
}

</style>
