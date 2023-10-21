<template>
  <div class="dropdown" ref="componentRef">
    <form class="dropdown__form">
      <label v-if="!selectedValue" for="search-input">
        <input class="dropdown__input"
               type="text"
               ref="inputRef"
               id="search-input"
               v-model.trim="inputValue"
               :placeholder="placeholder"
               @focus="setFocusAndUpdate"/>
      </label>
      <div v-else class="dropdown__input" @click="deselectItem" @keydown.enter="deselectItem">{{
          placeholder
        }}
      </div>
      <span v-if="inputValue || selectedValue" class="dropdown__reset"
            @click="selectItem(undefined)" @keydown.enter="selectItem(undefined)">✕</span>
    </form>
    <ul class="dropdown__list" v-if="focus" ref="listRef">
      <transition-group name="options-list">
        <li class="dropdown__list-item"
            v-for="item in filteredVisibleList"
            :key="item.value"
            :style="{ height: `${optionHeight}rem` }"
            @click="selectItem(item)"
            @keydown.enter="selectItem(item)">
          {{ item.text }}
        </li>
      </transition-group>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, onUnmounted, ref, Ref, watch, nextTick,
} from 'vue';
import { isEventOutside } from '@/helpers';
import { InputOption } from '@/typings/typings';

export default defineComponent({
  name: 'TextInput',
  props: {
    modelValue: Object as () => InputOption,
    list: {
      type: Array as () => InputOption[],
      default: () => [],
    },
    placeholder: {
      type: String,
      default: 'Start typing',
    },
    maxVisibleOptions: {
      type: Number,
      default: 5,
    },
  },
  setup(props, context) {
    const componentRef: Ref<HTMLElement | null> = ref(null);
    const listRef: Ref<HTMLElement | null> = ref(null);
    const inputRef: Ref<HTMLElement | null> = ref(null);

    const selectedValue = ref(props.modelValue);
    const focus = ref(false);
    const inputValue = ref('');
    const optionHeight = ref(5);
    const padding = 2;
    const numberOfVisibleOptions = ref(0);

    // is option contain input value to be visible
    const isItemVisible = (item: InputOption): boolean => {
      if (!item || !item.text) return false;
      return !!(inputValue.value && item.text.search(new RegExp(`${inputValue.value.replace('-', ' ')}`, 'i')) === 0);
    };

    // return array of visible options (to show it under input element)
    const filteredVisibleList = computed(() => props.list
      .filter((item: InputOption) => isItemVisible(item)));

    // cleaning data after focusing on another element and returning the initial value
    const dropdownBlurHandler = (event: MouseEvent) => {
      const component = componentRef.value;
      if (isEventOutside(component as HTMLElement, event.target as Node)) {
        focus.value = false;
        inputValue.value = '';
        selectedValue.value = props.modelValue;
      }
    };

    // return number of visible options according to page characteristics (height, position, etc.)
    const calculateNumberOfVisibleOptions = () => {
      const listElement = listRef.value;
      if (listElement) {
        // the distance from the top of the page to the list element
        const listTop = listElement.getBoundingClientRect().top;

        const windowHeight = window.innerHeight;

        // current font size (needed because of using rem)
        const rootFontSizePx = parseFloat(getComputedStyle(document.documentElement).fontSize);

        // Possible free place under input for the list element
        const possibleListHeightPx = windowHeight - listTop - padding * rootFontSizePx;

        // Option height in pixels
        const optionHeightPx = rootFontSizePx * optionHeight.value;

        // The number of maximum visible options on the page
        numberOfVisibleOptions.value = Math
          .min(Math.floor(possibleListHeightPx / optionHeightPx), props.maxVisibleOptions);

        // If more than 1 (>=2), then it should be under the input
        if (numberOfVisibleOptions.value > 1) {
          listElement.style.bottom = 'auto';
          listElement.style.top = '100%';
          listElement.style.maxHeight = `${possibleListHeightPx}px`;
        // else it should be over the input
        } else {
          listElement.style.top = 'auto';
          listElement.style.bottom = '100%';
          listElement.style.maxHeight = `${windowHeight - possibleListHeightPx}px`;
          // recalculating due to a change in the opening direction
          numberOfVisibleOptions.value = Math.min(Math.floor(
            (windowHeight - possibleListHeightPx) / optionHeightPx,
          ), props.maxVisibleOptions);
        }
      }
    };

    // recalculating of number o visible options after list element updating
    watch(listRef, calculateNumberOfVisibleOptions);

    // emitting value on input value changing
    watch(inputValue, (val) => {
      context.emit('inputValue', val);
    });

    // cleaning after selecting an option and updating modelValue
    const selectItem = (item: InputOption | undefined) => {
      inputValue.value = '';
      selectedValue.value = item;
      context.emit('update:modelValue', item);
    };

    // input cleaning for the new iteration of the search
    const deselectItem = () => {
      selectedValue.value = undefined;
      nextTick(() => (inputRef.value as HTMLInputElement).focus());
    };

    // setting the focus value to true for the possibility of a list of options
    const setFocusAndUpdate = () => {
      focus.value = true;
      context.emit('inputValue', inputValue.value.replace('-', ' '));
    };

    // setting another element blur handler on mounting
    onMounted(() => {
      document.body.addEventListener('mousedown', dropdownBlurHandler);
    });

    // cleaning after removal from the page
    onUnmounted(() => {
      document.body.removeEventListener('mousedown', dropdownBlurHandler);
    });

    return {
      componentRef,
      listRef,
      inputRef,
      selectedValue,
      focus,
      inputValue,
      filteredVisibleList,
      optionHeight,
      selectItem,
      deselectItem,
      setFocusAndUpdate,
    };
  },
});
</script>

<style lang="scss">
@import '@/assets/style/mixins';

.dropdown {
  position: relative;
  z-index: 100;
  width: 100%;

  &__form {
    position: relative;
  }

  &__input {
    @include adaptive-prop('font-size', 1.6, 2);
    cursor: text;
    width: 100%;
    padding: 1.5rem 2rem;
    border-radius: 8px;
    background: #1E1E29;
    color: #a8a8bb;
    line-height: 2.2rem;
    text-transform: capitalize;
  }

  &__reset {
    position: absolute;
    top: 50%;
    right: 2.5rem;
    cursor: pointer;
    font-size: 2.5rem;
    transform: translateY(-50%);
    color: #FAFAFA;
  }

  &__list {
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    overflow: hidden;
  }

  &__list-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #FAFAFA;
    padding: 0 2rem;
    font-size: 1.6rem;
    line-height: 2rem;
    background: #3B3B54;

    &:first-child {
      border-radius: 0.8rem 0.8rem 0 0;
    }

    &:last-child {
      border-radius: 0 0 0.8rem 0.8rem;
    }

    &:only-child {
      border-radius: 0.8rem;
    }

    &:hover {
      background: #282838;
      cursor: pointer;
    }

    &:not(:last-child) {
      border-bottom: 1px solid #1E1E29;
    }
  }

  .options-list-enter-active,
  .options-list-leave-active {
    transition: all .2s ease;
  }

  .options-list-enter-from,
  .options-list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }

}
</style>
