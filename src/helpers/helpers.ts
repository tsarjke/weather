import { Location } from '@/typings/typings';
import { ref, Ref } from 'vue';

export const isEventOutside = (element: HTMLElement, target: Node | null): boolean => {
  // if there is no target, then the click was outside the component
  if (!target) return true;

  // The click was inside the component
  if (element.contains(target)) return false;

  // Checking of the parent element of the target element (recursively to the end of the parents)
  return isEventOutside(element, (target as HTMLElement).parentElement);
};

export const catchError = (e: unknown) => {
  if (typeof e === 'string') {
    throw new Error();
  } else if (e instanceof Error) {
    throw new Error(e.message);
  } else {
    throw new Error('Something went wrong!');
  }
};

export const getOptionsFromLocations = (loc: Location[]) => loc.map(({
  name, region, country, lat, lon,
}) => ({ text: `${name}${region && ` - ${region}`} - ${country}`, value: `${lat},${lon}` }));

export const fetchData = <T>(callback: (...args: T[]) => unknown)
  :[(...args: T[]) => void, Ref<boolean>, Ref<string>] => {
  const error: Ref<string> = ref('');
  const isLoading: Ref<boolean> = ref(false);
  function setError(e: string) { error.value = e; }
  function setIsLoading(value: boolean) { isLoading.value = value; }

  const fetching = async (...args: T[]) => {
    try {
      setIsLoading(true);
      setError('');
      await callback(...args);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError(String(e));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
