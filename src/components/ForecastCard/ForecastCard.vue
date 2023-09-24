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
        iconPath: require(`@/assets/img/icons/weather/0/${item.day.condition.code}.png`),
      })));

    return {
      forecastArray,
    };
  },
});
</script>

<style lang="scss">
.forecast-card {

  &__list {
    display: flex;
    justify-content: space-around;
  }

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__weekday {
    color: #BFBFD4;
    font-size: 1.4rem;
    font-weight: 700;
  }

  &__icon {
    width: 6rem;
    height: 6rem;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__temp {
    font-size: 1.4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    &_max {
      color: #FAFAFA;
    }

    &_min {
      color: #7F7F98;
    }
  }
}
</style>
