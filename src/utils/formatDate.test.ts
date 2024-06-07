import { formatDate } from './formatDate';
import { it, expect } from 'vitest';

it('should format date', () => {
  const date = '2024/05/27';

  expect(formatDate(date)).toBe('2024');
});
