<template>
  <div
    v-if="movie"
    class="min-h-screen w-full bg-center bg-cover bg-fixed grayscale-0"
    :style="{
      backgroundImage: `url(${getImage(movie.backdrop_path)})`
    }"
  >
    <div class="bg-gradient-to-r from-black to-transparent">
      <div class="flex flex-col items-center pt-20 w-full h-full md:grid grid-cols-2">
        <img class="w-2/3 md:w-[400px] mx-auto rounded-lg" :src="getImage(movie.poster_path)" />
        <div class="md:flex flex-col items-start">
          <div class="mt-4 w-2/3 mx-auto md:mx-0">
            <h1 class="text-xl text-center pt-3 md:text-4xl font-semibold mb-4">
              {{ movie.title }}
            </h1>
            <p
              v-if="movie.overview"
              class="w-auto md:text-lg p-4 bg-black bg-opacity-75 rounded-lg text-white"
            >
              {{ movie.overview }}
            </p>
          </div>

          <div class="w-2/3 mx-auto flex md:flex items-end gap-10 md:mx-0 justify-between">
            <div class="flex flex-col text-sm gap-2 mt-3">
              <div class="flex items-center gap-2">
                <Icon icon="ph:film-reel" />
                <span>{{ formatGenres(movie.genres) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon icon="uiw:date" />
                <span>{{ movie.release_date }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon icon="ic:round-star" />
                <span>{{ Math.round(parseFloat(movie.vote_average)) }}/10</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon icon="ion:people" />
                <span>{{ movie.popularity }}</span>
              </div>
              <div class="flex items-center gap-2">
                <Icon icon="ic:twotone-access-time-filled" color="white" />
                <span>{{ minToHour(parseInt(movie.runtime)) }}h / {{ movie.runtime }} minutes</span>
              </div>
              <div class="flex items-center gap-2">
                <img
                  class="w-8"
                  :src="`https://flagsapi.com/${movie.origin_country}/flat/48.png`"
                />
                <span>{{ movie.country }}</span>
              </div>
            </div>
            <RouterLink
              to="/"
              class="rounded-xl py-3 border border-white px-7 bg-black bg-opacity-75 hover:bg-opacity-65 transition"
            >
              Home
            </RouterLink>
          </div>
          <div class="flex justify-items-center mt-4">
            <div class="mt-5 mx-auto mb-4" v-if="trailer">
              <iframe
                class="movie-trailer"
                width="450"
                height="350"
                :src="`https://www.youtube.com/embed/${trailer}`"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getImage } from '../utils/getImage';
import { useMovieViewStore } from '../stores/useMovieViewStore';
import { computed, onBeforeMount } from 'vue';
import { formatGenres } from '../utils/formatGenres';
import { minToHour } from '../utils/formatRuntime';

const movieViewStore = useMovieViewStore();

onBeforeMount(async () => {
  await movieViewStore.fetchMovie();
});

const movie = computed(() => movieViewStore.movie);
const trailer = computed(() => movieViewStore.trailer);
</script>

<style scoped>
.movie-trailer {
  width: 450px;
  height: 350px;
}

@media (width <= 768px) {
  .movie-trailer {
    width: 350px;
    height: 200px; /* Adjust the height proportionally if necessary */
  }
}

@media (width <= 480px) {
  .movie-trailer {
    width: 100%;
    height: auto; /* Let it adjust the height automatically */
  }
}
</style>
