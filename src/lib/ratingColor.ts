/**
 * Returns an HSL color string on a red→yellow→green spectrum based on rating 1-10.
 * 1 = red (0°), 5 = yellow (55°), 10 = green (140°)
 */
export const getRatingColor = (rating: number): string => {
  const clamped = Math.max(1, Math.min(10, rating));
  // Map 1-10 to hue 0-140
  const hue = ((clamped - 1) / 9) * 140;
  return `hsl(${Math.round(hue)}, 85%, 50%)`;
};
