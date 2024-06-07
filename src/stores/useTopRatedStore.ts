import { defineStore } from 'pinia';
import { addToLocalStorage } from '../utils/addToLocalStorage';
import { getFromLocalStorage } from '../utils/getFromLocalStorage';

interface MovieTopRated {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
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
  results: MovieTopRated[];
  total_pages: number;
  total_results: number;
}

interface State {
  topRated: MovieTopRated[];
  filteredMovies: MovieTopRated[];
  firstPage: number;
  currentPage: number;
  totalPages: number;
}

const useTopRatedStore = defineStore('useTopRatedStore', {
  state: (): State => ({
    topRated: [],
    filteredMovies: [],
    firstPage: 1,
    currentPage: 1,
    totalPages: 500
  }),
  actions: {
    async getMovies(pageNumber = 1): Promise<void> {
      const API_KEY = import.meta.env.VITE_APP_API_KEY;
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&/language=en-US&page=${pageNumber}`
        );
        const data: MoviesObj = await res.json();
        this.topRated = data.results;
        this.filteredMovies = data.results;
        this.currentPage = data.page;
        this.totalPages = data.total_pages;
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } catch (err) {
        console.log("Couldn't fatch API", err);
      }
    },
    async filterMoviesByGenre(genreId: number | string) {
      if (genreId && genreId !== 'all') {
        this.filteredMovies = this.topRated.filter(movie =>
          movie.genre_ids.includes(Number(genreId))
        );
        if (genreId === 'all') {
          this.getMovies();
        }
      } else {
        this.filteredMovies = this.topRated;
      }
    },
    async goToNextPage(): Promise<void> {
      if (this.currentPage < this.totalPages) {
        await this.getMovies(this.currentPage + 1);
        addToLocalStorage('currentPage', this.currentPage);
      }
    },
    async goToPreviousPage(): Promise<void> {
      if (this.currentPage > 1) {
        await this.getMovies(this.currentPage - 1);
        addToLocalStorage('currentPage', this.currentPage);
      }
    },
    async goToLastPage(): Promise<void> {
      if (this.currentPage !== this.totalPages) {
        await this.getMovies(this.totalPages);
        addToLocalStorage('currentPage', this.currentPage);
      }
    },
    async goToFirstPage(): Promise<void> {
      if (this.currentPage !== this.firstPage) {
        await this.getMovies(this.firstPage);
        addToLocalStorage('currentPage', this.currentPage);
      }
    },
    async initializePage(): Promise<void> {
      const savedPage = getFromLocalStorage('currentPage');
      const pageNumber = savedPage ? parseInt(savedPage, 10) : 1;
      await this.getMovies(pageNumber);
    }
  }
});

export { useTopRatedStore };
