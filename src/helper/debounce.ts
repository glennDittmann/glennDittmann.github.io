/**
 * Returns a debounced version of `fn`, that aggregates consectuive calls to itself into a single call,
 * after `waitTime` millisecondes have passed since the most recent call.
 *
 * see: https://developer.mozilla.org/en-US/docs/Glossary/Debounce
 *
 * and: https://css-tricks.com/debouncing-throttling-explained-examples/
 *
 * @param fn the function to debounce
 * @param waitTime the time that has to pass, after that `fn` is actually called
 * @returns the debounced version of `fn`
 */
export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  waitTime: number,
): (...args: Args) => void {
  let timeoutId: ReturnType<typeof setTimeout> | undefined;

  return (...args: Args) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      timeoutId = undefined;
      fn(...args);
    }, waitTime);
  };
}
