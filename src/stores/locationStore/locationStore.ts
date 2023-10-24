import { defineStore } from 'pinia';
import { computed, Ref, ref } from 'vue';
import { locationSearch } from '@/services';
import { Location } from '@/typings/typings';
import { fetchData, getOptionsFromLocations } from '@/helpers';

export default defineStore('locationStore', () => {
  const locations: Ref<Location[]> = ref([]);

  const locationOptions = computed(() => getOptionsFromLocations(locations.value));

  const clearLocations = () => {
    locations.value = [];
  };

  const [getLocations, isLocationLoading, locationError] = fetchData(
    async (value: string) => {
      if (value) {
        locations.value = await locationSearch(value);
      } else {
        clearLocations();
      }
    },
  );

  return {
    locationOptions, getLocations, clearLocations, isLocationLoading, locationError,
  };
});
