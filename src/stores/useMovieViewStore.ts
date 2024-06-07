import { defineStore } from 'pinia';
import { useRouter } from 'vue-router';
import type { Movie, Trailers, DataTrailers } from '../types/index.d';

export const useMovieViewStore = defineStore('movieView', {
  state: () => ({
    movie: null as Movie | null,
    trailer: null as string | null
  }),
  actions: {
    async fetchMovie(): Promise<void> {
      const router = useRouter();
      const movieId = router.currentRoute.value.params.id as string;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`
        );
        const data = await response.json();
        this.movie = data;
        await this.fetchTrailers(movieId);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchTrailers(movieId: string): Promise<void> {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=d2ce0f0f819d68fd1a6501d3a910ba38`
        );
        const data: DataTrailers = await response.json();
        const trailers = data.results;
        this.trailer = this.findOfficialTrailer(trailers);
      } catch (error) {
        console.error(error);
      }
    },
    findOfficialTrailer(trailers: Trailers[]): string | null {
      for (const video of trailers) {
        if (video.name === 'Official Trailer') {
          return video.key;
        }
      }
      return null;
    }
  }
});
