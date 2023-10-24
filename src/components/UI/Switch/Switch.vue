<template>
  <label class="switch" for="switch-btn">
    <input type="checkbox"
           class="switch__button"
           id="switch-btn"
           :class="[isDark ? 'light' : 'dark']"
           :checked="!isDark"
           :disabled="disabled"
           @change="switchTheme"/>
  </label>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SwitchButton',
  props: {
    mode: {
      type: String,
      required: false,
      default: 'light',
    },
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props, context) {
    const isDark = computed(() => props.mode === 'dark');

    const switchTheme = (e: Event) => {
      e.stopPropagation();
      context.emit('change', isDark.value ? 'light' : 'dark');
    };

    return {
      isDark,
      switchTheme,
    };
  },
});
</script>

<style lang="scss">
.switch {
  display: inline-flex;
  align-items: center;
  position: relative;

  --disabled-color: grey;
  --light-color: #A2D1FD;
  --dark-color: #1F2533;
  --fg-color-disabled: #404040;
  --fg-color-light: #FFC187;
  --fg-color-moon: #DEE5F3;
  --fg-color-darkside: rgba(31, 37, 51, 0.79);
  --height: 2rem;
  --padding: 0.25rem;
  --width: calc(var(--height) + var(--height) * 1.2);
  --button-end-position: calc(var(--width) - var(--height));

  &__button {
    cursor: pointer;
    position: relative;
    appearance: none;
    -webkit-appearance: none;
    border: none;
    width: calc(var(--width) + (var(--padding) * 2));
    height: calc(var(--height) + (var(--padding) * 2));
    background-color: var(--light-color);
    border-radius: calc(calc(var(--height) + 0.5em) / 2);
    padding: var(--padding);

    &:after {
      content: "";
      display: block;
      width: var(--height);
      height: var(--height);
      border-radius: 50%;
      transition: transform 0.2s ease-in-out;
      transform: translate(0, 0);
    }

    &:before {
      content: "";
      display: block;
      position: absolute;
      z-index: 1;
      width: calc(var(--height) * 0.75);
      height: calc(var(--height) * 0.75);
      border-radius: 50%;
      transform: translate(calc(var(--button-end-position) + var(--height) * 0.03),
        calc(var(--height) * 0.04));
    }

    &.light:not([disabled]) {
      background-image: url("icons/clouds.svg");
      background-position: 0 100%;
      background-repeat: no-repeat;

      &:after {
        background: var(--fg-color-light);
        box-shadow: 0 2.6px 5.2px 0 #FFD0A5 inset, 0 -2.6px 5.2px 0 #FFA149 inset,
        0 0 11.7px 0 rgba(255, 193, 135, 0.60), -3.9px 6.5px 5.2px 0 rgba(183, 183, 183, 0.35);
      }
    }

    &.dark {
      background-image: url("icons/stars.svg");

      &:after {
        background-color: var(--fg-color-moon);
        box-shadow: 0 2.6px 5.2px 0 #BFBFC0 inset, 0 -2.6px 5.2px 0 #FFF inset,
        -3.9px 0 19.5px 0 rgba(183, 183, 183, 0.31);
      }

      &:before {
        background-color: var(--fg-color-darkside);
      }
    }

    &:checked {
      background-color: var(--dark-color);

      &:after {
        transform: translate(var(--button-end-position), 0);
      }
    }

    &:disabled {
      cursor: auto;
      background-color: var(--fg-color-disabled);
      opacity: 0.5;

      &:after {
        background-color: darkgrey;
        box-shadow: none;
      }
    }
  }
}
</style>
