import { Location } from '@/typings/typings';
import { ref, Ref } from 'vue';

// check whether the target is inside the element (recursively)
export const isEventOutside = (element: HTMLElement, target: Node | null): boolean => {
  // if there is no target, then the click was outside the component
  if (!target) return true;

  // The click was inside the component
  if (element.contains(target)) return false;

  // Checking of the parent element of the target element (recursively to the end of the parents)
  return isEventOutside(element, (target as HTMLElement).parentElement);
};

// error handler
export const catchError = (e: unknown) => {
  if (typeof e === 'string') {
    throw new Error();
  } else if (e instanceof Error) {
    throw new Error(e.message);
  } else {
    throw new Error('Something went wrong!');
  }
};

// get options (visible text and value) for search input element from locations array
export const getOptionsFromLocations = (loc: Location[]) => loc.map(({
  name, region, country, lat, lon,
}) => ({ text: `${name}${region && ` - ${region}`} - ${country}`, value: `${lat},${lon}` }));

// server request template, which return ready method, loading and error statuses
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

// return string with capitalized first letter
export const capitalizeFirstLetter = (s: string) => `${s[0].toUpperCase()}${s.slice(1)}`;

// return day, date and time according to timezone from timestamp (s, not ms)
export const getDateObject = (sec: number | undefined, timezone = '') => {
  const day = capitalizeFirstLetter(new Date((sec || 0) * 1000).toLocaleString('en-US', { weekday: 'long', timeZone: `${timezone}` }));
  const date = new Date((sec || 0) * 1000).toLocaleDateString('default', { timeZone: `${timezone}` });
  const time = new Date((sec || 0) * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', timeZone: `${timezone}` });
  return ({
    day, date, time,
  });
};
