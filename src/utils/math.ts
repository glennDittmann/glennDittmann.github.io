interface Vec2 {
  x: number;
  y: number;
}

/**
 * @returns a random number between 0 and 360
 */
export const randDeg = (): number => Math.random() * 360;

/**
 * @expects `lo` < `hi`
 * @param lo `lo`wer end of the range
 * @param hi `hi`gher end of the range
 * @returns a random number between `lo` and `hi`
 */
export const randBetween = (lo: number, hi: number): number => hi - Math.random() * (hi - lo);

/**
 * @param angle the angle in degrees
 * @returns the angle in radians
 */
const degToRed = (angle: number): number => angle * Math.PI / 180.0;

/**
 * Converts polar (angle, distance) to cartesian (x, y) coordinates
 * @param angle the angle part of the polar coordinates
 * @param distance the distance part of the polar coordinates
 * @returns the corresponding cartesian coordiantes
 */
export const polarToCartesian = (angle: number, distance: number): Vec2 => {
   const angleInRadians = degToRed(angle);

   return {
    x: Math.cos(angleInRadians) * distance,
    y: Math.sin(angleInRadians) * distance,
   }
}

/**
 * Clamps `val` between `min` and `max`. Note: cases where `min` > `max` are handled.
 * @param val 
 * @param min 
 * @param max 
 * @returns 
 */
export const clamp = (
  val: number,
  min: number = 0,
  max: number = 1
) => {
  if (min > max) {
    [min, max] = [max, min];
  }

  return Math.max(min, Math.min(max, val));
};

/**
 * Scales `val` from it's current range to a respective new range.
 * @param val the value to map to the new scale
 * @param currScaleMin the lower bound of the current range
 * @param currScaleMax the upper bound of the current range
 * @param targetScaleMin the lower bound of the new range
 * @param targetScaleMax the upper bound of the new range
 * @returns the value of `val` scaled to the new range
 */
export const lerperino = (val: number, currScaleMin: number, currScaleMax: number, targetScaleMin: number = 0, targetScaleMax: number = 1): number => {
  const standardNormalization = (val - currScaleMin) / (currScaleMax - currScaleMin);

  return (targetScaleMax - targetScaleMin) * standardNormalization + targetScaleMin;
}

/**
 * Scales `val` from it's current range to a respective new range. Clamps the result between `targetScaleMin` and `targetScaleMax`.
 * @param val the value to map to the new scale
 * @param currScaleMin the lower bound of the current range
 * @param currScaleMax the upper bound of the current range
 * @param targetScaleMin the lower bound of the new range
 * @param targetScaleMax the upper bound of the new range
 * @returns the value of `val` scaled and clamped to the new range
 */
export const clampedLerperino = (val: number, currScaleMin: number, currScaleMax: number, targetScaleMin: number = 0, targetScaleMax: number = 1): number => {
  return clamp(lerperino(val, currScaleMin, currScaleMax, targetScaleMin, targetScaleMax), targetScaleMin, targetScaleMax);
}