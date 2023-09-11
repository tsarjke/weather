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

export const fetchData = async <T, U>(func: (arg: U) => Promise<T>, value: U) => {
  if (value) {
    return func(value);
  }
  return Promise.resolve();
};
