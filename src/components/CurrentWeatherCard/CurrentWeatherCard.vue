<template>
  <div class="weather-card">
    <div class="weather-card__content">
      <header class="weather-card__header header card">
        <div class="header__date">
          <h2 class="header__title">{{ location?.name }} - {{ location?.country }}</h2>
          <h4 class="header__subtitle">{{ currentDate.day }}, {{ currentDate.date }}</h4>
        </div>
        <div class="header__time">
          <h4 class="header__subtitle">{{ currentDate.time }}</h4>
        </div>
      </header>
      <main class="weather-card__main temp card">
        <div class="temp__value">
          <h2 class="temp__current">{{ currentCond.currentTemp }}ºc</h2>
          <h2 class="temp__feels-like">feels like {{ currentCond.feelsLike }}ºc</h2>
        </div>
        <div class="temp__icon">
          <img
            :src="currentCond.iconPath"
            :alt="currentCond.text">
          <p>{{ currentCond.text }}</p>
        </div>
      </main>
    </div>
    <div class="weather-card__bg">
      <img :src="currentCond.bgPath" alt="card-background">
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { CurrentWeatherData } from '@/typings/typings';
import { getDateObject } from '@/helpers';

export default defineComponent({
  name: 'CurrentWeatherCard',
  props: {
    data: Object as () => CurrentWeatherData,
  },
  setup(props) {
    const location = computed(() => props.data?.location);

    const currentCond = computed(() => ({
      // eslint-disable-next-line global-require,import/no-dynamic-require
      iconPath: require(`@/assets/img/icons/weather/${props.data?.current.is_day}/${props.data?.current.condition.code}.png`),
      // eslint-disable-next-line global-require,import/no-dynamic-require
      bgPath: require(`@/assets/img/weather-card-bg/${props.data?.current.is_day}.jpg`),
      text: props.data?.current.condition.text,
      currentTemp: props.data?.current?.temp_c,
      feelsLike: props.data?.current?.feelslike_c,
    }));

    // date return in convenient form from non-convenient timestamp in seconds
    const currentDate = computed(
      () => getDateObject(location.value?.localtime_epoch, location.value?.tz_id),
    );

    return {
      currentCond,
      location,
      currentDate,
    };
  },
});

</script>

<style lang="scss">
@import '@/assets/style/mixins';

.weather-card {
  position: relative;
  padding: 1rem;

  &__content {
    height: 100%;
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }

  &__bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
      border-radius: 1rem;
    }
  }

  @media (min-width: 1023px) {
    padding: 3rem;
  }
}

.header {

  &__date {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  &__title {
    @include adaptive-prop('font-size', 1.6, 2.8);
    font-weight: 700;
  }

  &__subtitle {
    @include adaptive-prop('font-size', 1.4, 2);
  }

  &__time {
    h4 {
      @include adaptive-prop('font-size', 1.4, 2.8);
    }
  }

  @media (min-width: 1023px) {
    flex: 1 0 auto;
  }
}

.temp {
  align-items: center;

  &__value {
    align-self: flex-end;
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
  }

  &__current {
    @include adaptive-prop('font-size', 4.6, 8);
  }

  &__feels-like {
    @include adaptive-prop('font-size', 1.4, 2);
  }

  &__icon {
    display: flex;
    flex-direction: column;
    align-items: center;

    img {
      margin-top: -1rem;
      height: 7vw;
      width: 7vw;
    }

    p {
      @include adaptive-prop('font-size', 1, 1.6);
    }
  }
}

.card {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  color: #FAFAFA;
}
</style>
