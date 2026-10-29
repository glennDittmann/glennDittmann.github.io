/**
 * Returns a throttled version of `fn`, that can be called at most once every `interval` milliseconds.
 *
 * see: https://developer.mozilla.org/en-US/docs/Glossary/Throttle
 *
 * and: https://css-tricks.com/debouncing-throttling-explained-examples/
 *
 * Note: this for learning purposes; I suggest using `radashi` or `lodash`.
 *
 * @param fn the function to throttle
 * @param interval the time that has to pass between successive invocations of `fn` in ms
 * @returns the throttled version of `fn`
 */
export function throttle<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  interval: number,
): (...args: Args) => Result {
  let lastExecutedOn: number | undefined;
  let lastResult: Result;

  return (...args: Args): Result => {
    const now = Date.now();

    if (lastExecutedOn === undefined || now - lastExecutedOn >= interval) {
      lastExecutedOn = now;
      lastResult = fn(...args);
    }

    return lastResult;
  };
}
