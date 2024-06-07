import { defineStore } from 'pinia';
import { addToLocalStorage } from '../utils/addToLocalStorage';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';

interface MoviePopular {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface MoviesObj {
  page: number;
  results: MoviePopular[];
  total_pages: number;
  total_results: number;
}

interface State {
  movies: MoviePopular[];
  genres: Genre[];
  firstPage: number;
  currentPage: number;
  totalPages: number;
}

interface Genre {
  id: number;
  name: string;
}

export const usePopularMoviesStore = defineStore('usePopularMoviesStore', {
  state: (): State => {
    return {
      movies: [],
      genres: [],
      firstPage: 1,
      currentPage: 1,
      totalPages: 500
    };
  },
  actions: {
    async getMovies(pageNumber = 1): Promise<void> {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;
      const endpoint = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${pageNumber}`;

      try {
        const res = await fetch(endpoint);
        const data: MoviesObj = await res.json();
        this.movies = data.results;
        this.currentPage = data.page;
        this.firstPage = 1;
        this.totalPages = data.total_pages || 500;
        window.scrollTo({ top: 800, behavior: 'smooth' });
      } catch (error) {
        console.error(error);
      }
    },
    async getGenres(): Promise<void> {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;
      const res = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`
      );
      const data = await res.json();
      this.genres = data.genres;
    },
    async goToNextPage(): Promise<void> {
      if (this.currentPage < this.totalPages) {
        await this.getMovies(this.currentPage + 1);
        addToLocalStorage('currentPagePopular', this.currentPage);
      }
    },
    async goToPreviousPage(): Promise<void> {
      if (this.currentPage > 1) {
        await this.getMovies(this.currentPage - 1);
        addToLocalStorage('currentPagePopular', this.currentPage);
      }
    },
    async goToLastPage(): Promise<void> {
      if (this.currentPage !== this.totalPages) {
        await this.getMovies(500);
        addToLocalStorage('currentPagePopular', 500);
      }
    },
    async goToFirstPage(): Promise<void> {
      if (this.currentPage !== this.firstPage) {
        await this.getMovies(this.firstPage);
        addToLocalStorage('currentPagePopular', this.currentPage);
      }
    },
    async initializePage(): Promise<void> {
      const savedPage = getFromLocalStorage('currentPagePopular');
      const pageNumber = savedPage ? parseInt(savedPage, 10) : 1;
      await this.getMovies(pageNumber);
    }
  },
  getters: {
    findGenres: state => {
      return (genreIds: number[]): string => {
        return genreIds
          .map(id => {
            const genre = state.genres.find(g => g.id === id);
            return genre ? genre.name : '';
          })
          .filter(name => name !== '')
          .join(' | ');
      };
    }
  }
});
