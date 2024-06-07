import { getImage } from './getImage';
import { it, expect } from 'vitest';

it('should return image path', () => {
  const path = '/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg';
  expect(getImage(path)).toBe(
    'https://image.tmdb.org/t/p/original/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg'
  );
});
