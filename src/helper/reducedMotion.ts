/**
 * Checks if the user has enabled reduced motion.
 * @returns true if the user has enabled reduced motion, false otherwise
 */
export function prefersReducedMotion() {
  return !window.matchMedia(
    '(prefers-reduced-motion: no-preference)'
  ).matches;
}