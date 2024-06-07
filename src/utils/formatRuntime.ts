export function minToHour(minutes: number): number {
  const hours = (minutes / 60).toFixed(1);
  return parseInt(hours);
}
