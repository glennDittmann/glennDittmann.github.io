import { Vector2 } from "three";

/**
 * @param domRect
 * @returns the center of the domRect, relative to the viewport as a `three.Vector2`
 */
export function getRectCenter(domRect: DOMRect): Vector2 {
  const centerX = domRect.left + domRect.width / 2.0;
  const centerY = domRect.top + domRect.height / 2.0;

  return new Vector2(centerX, centerY);
}

/**
 * During Server-side Rendering the window object is not present yet.
 * @returns `true` if the window object is `undefined`
 */
export function isSSR(): boolean {
  return window === undefined;
}
