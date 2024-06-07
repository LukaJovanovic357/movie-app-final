import type { Genres } from '../types';

export const formatGenres = (genres: Genres[]): string => {
  const movieGenres = [...genres];
  return movieGenres.map(genre => `${genre.name}`).join(', ');
};
