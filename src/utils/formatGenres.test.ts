import { formatGenres } from './formatGenres';
import { it, expect } from 'vitest';

it('should format genres', () => {
  const genres = [
    { id: 1, name: 'Action' },
    { id: 1, name: 'Drama' },
    { id: 1, name: 'Comedy' },
    { id: 1, name: 'Thriller' }
  ];

  expect(formatGenres(genres)).toBe('Action, Drama, Comedy, Thriller');
});
