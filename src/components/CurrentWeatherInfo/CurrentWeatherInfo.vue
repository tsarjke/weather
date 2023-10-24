<template>
  <div class="weather-info">
    <ul class="weather-info__list">
      <li v-for="item in currentCondition" :key="item.text" class="weather-info__item item">
        <div class="weather-info__icon" :class="item.iconClass">
        </div>
        <p class="weather-info__text">{{ item.text }}</p>
        <div v-if="item.iconValueClass"
             :class="['weather-info__icon', item.iconValueClass]"
             :style="{transform: `rotate(${item.value - 180}deg)`}"/>
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
        text: 'Precipitation (mm)', value: props.data?.precip_mm, iconClass: 'icon-precip',
      },
      {
        text: 'Wind speed (km/h)', value: props.data?.wind_kph, iconClass: 'icon-wind-speed',
      },
      {
        text: 'Wind direction',
        value: props.data?.wind_degree,
        iconClass: 'icon-wind-dir',
        iconValueClass: 'icon-arrow',
      },
      {
        text: 'Humidity (%)', value: props.data?.humidity, iconClass: 'icon-humidity',
      },
      {
        text: 'Cloud (%)', value: props.data?.cloud, iconClass: 'icon-cloud',
      },
    ]);

    return {
      currentCondition,
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/style/mixins';

.weather-info {
  width: 100%;

  &__item {
    display: flex;
    gap: 1.2rem;
    align-items: center;
    @include adaptive-prop('padding', 1, 2.5);

    &:not(:last-child) {
      border-bottom: 1px solid var(--background-second-color);
    }
  }

  &__icon {
    font-family: 'weather-info-icons';
    font-size: 2rem;
  }

  &__text {
    flex: 1 0 auto;
    color: var(--info-second-color);
    @include adaptive-prop('font-size', 1.4, 2);
    font-weight: 700;
  }

  &__value {
    color: var(--info-color);
    @include adaptive-prop('font-size', 1.6, 2.8);
  }
}

</style>
