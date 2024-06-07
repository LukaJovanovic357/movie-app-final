import { getRandomInt } from './getRandomInt';
import { it, expect, vi } from 'vitest';

it('should return an integer within the specified range', () => {
  const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.5);

  const min = 1;
  const max = 10;
  const expectedValue = Math.floor(0.5 * (max - min) + min);

  const result = getRandomInt(min, max);
  expect(result).toBe(expectedValue);

  randomSpy.mockRestore();
});

it('should return the minimum value when Math.random returns 0', () => {
  const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0);

  const min = 5;
  const max = 15;
  const expectedValue = min;

  const result = getRandomInt(min, max);
  expect(result).toBe(expectedValue);

  randomSpy.mockRestore();
});

it('should return the maximum value minus one when Math.random returns almost 1', () => {
  const randomSpy = vi.spyOn(Math, 'random').mockReturnValue(0.999999);

  const min = 5;
  const max = 15;
  const expectedValue = max - 1;

  const result = getRandomInt(min, max);
  expect(result).toBe(expectedValue);

  randomSpy.mockRestore();
});
