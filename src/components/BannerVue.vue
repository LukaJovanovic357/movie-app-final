<template>
  <div v-if="movie">
    <div
      class="w-full h-screen bg-center bg-cover"
      :style="{
        backgroundImage: `url(${getImage(movie.backdrop_path)})`
      }"
    >
      <div
        class="text-white p-10 flex flex-col justify-center w-full h-full bg-gradient-to-r from-black to to-transparent"
      >
        <h1 class="text-3xl mb-3 md:text-8xl font-bold">
          {{ movie.title }}
        </h1>
        <p class="w-full md:mt-5 md:w-1/2 text-sm text-neutral-400">
          {{ movie.overview }}
        </p>
        <RouterLink
          :to="`/movies/${movie.id}`"
          class="flex items-center gap-1 px-6 py-4 rounded-md bg-green-700 w-fit mt-4 transition hover:bg-neutral-800 font-semibold"
        >
          <span>View More</span>
          <span>
            <Icon icon="ic:round-play-arrow" />
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { getImage } from '../utils/getImage.js';
import { RouterLink } from 'vue-router';
import { usePopularMoviesStore } from '../stores/usePopularMoviesStore';
import { getRandomInt } from '../utils/getRandomInt.js';

const popularMovies = usePopularMoviesStore();
await popularMovies.getMovies();
const movie = popularMovies.movies[getRandomInt(0, 19)];
</script>
