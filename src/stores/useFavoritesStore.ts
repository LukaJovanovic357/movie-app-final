import { defineStore } from 'pinia';
import type { Favorite } from '../types/index.d';

export const useFavorites = defineStore('favorites', {
  state: () => ({
    favorites: JSON.parse(localStorage.getItem('favorites') || '[]') as Favorite[]
  }),
  actions: {
    toggleFavorite(movie: Favorite): void {
      if (!this.isFavorite(movie)) {
        this.favorites.push(movie);
        this.saveMovieToLocalStorage();
      } else {
        this.favorites = this.favorites.filter(favorite => favorite.id !== movie.id);
        this.saveMovieToLocalStorage();
      }
    },
    isFavorite(movie: Favorite): boolean {
      return this.favorites.some(favorite => favorite.id === movie.id);
    },
    saveMovieToLocalStorage(): void {
      localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }
  }
});
