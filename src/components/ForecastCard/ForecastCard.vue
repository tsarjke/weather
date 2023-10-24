<template>
  <div class="forecast-card">
    <ul class="forecast-card__list">
      <li v-for="forecast in forecastArray" class="forecast-card__item" :key="forecast.date_epoch">
        <p class="forecast-card__weekday">{{ forecast.weekDay }}</p>
        <div class="forecast-card__icon">
          <img :src="forecast.iconPath" alt="">
        </div>
        <div class="forecast-card__temp">
          <p class="forecast-card__temp_max">{{forecast.day.maxtemp_c}}ºc</p>
          <p class="forecast-card__temp_min">{{forecast.day.mintemp_c}}ºc</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { ForecastForDay } from '@/typings/typings';
import { capitalizeFirstLetter } from '@/helpers';

export default defineComponent({
  name: 'ForecastCard',
  props: {
    data: Object as () => ForecastForDay[],
  },
  setup(props) {
    const forecastArray = computed(() => props.data
      ?.map((item) => ({
        ...item,
        weekDay: capitalizeFirstLetter(new Date(item.date_epoch * 1000).toLocaleString('default', { weekday: 'short' })),
        // eslint-disable-next-line global-require,import/no-dynamic-require
        iconPath: require(`@/assets/img/icons/weather/1/${item.day.condition.code}.png`),
      })));

    return {
      forecastArray,
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/style/mixins';

.forecast-card {
  width: 100%;

  &__list {
    display: flex;
    justify-content: space-around;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    @include adaptive-prop('padding', 1, 2);
  }

  &__weekday {
    color: var(--info-second-color);
    @include adaptive-prop('font-size', 1.4, 2);
    font-weight: 700;
  }

  &__icon {
    height: 6.5vw;
    width: 6.5vw;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__temp {
    @include adaptive-prop('font-size', 1.4, 2);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &_max {
      color: var(--info-color);
    }

    &_min {
      color: var(--info-second-color);
    }
  }
}
</style>
