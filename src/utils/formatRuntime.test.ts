import { minToHour } from './formatRuntime';
import { it, expect } from 'vitest';

it('should format Runtime', () => {
  const runTime = 142;

  expect(minToHour(runTime)).toBe(2);
});
