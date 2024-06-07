<template>
  <div class="relative grid md:grid-cols-2 lg:grid-cols-4 gap-4 mx-20 my-10">
    <MovieCard v-for="movie in movies" :movie="movie" :key="Math.random() * 1000" />
  </div>
  <div class="flex justify-center items-center gap-3 p-5">
    <img
      @click="scrollDown"
      class="hover:cursor-pointer absolute top-[870px] right-4 mt-2"
      src="../assets/arrowDown.png"
      alt="arrow-down"
      width="50"
    />
    <span
      v-if="currentPage !== 1"
      @click="goToFirstPage"
      class="text-white hover:cursor-pointer hover:text-yellow-500"
      >First Page
    </span>
    <span
      v-if="currentPage !== 1"
      @click="goToPreviousPage"
      class="bg-yellow-300 text-lg px-4 rounded-md text-black hover:cursor-pointer hover:bg-yellow-200"
      ><</span
    >
    <span
      v-if="currentPage !== 1"
      @click="goToPreviousPage"
      class="text-white hover:cursor-pointer hover:text-yellow-500"
      >{{ currentPage - 1 }}</span
    >
    <span v-if="lastPage !== 500" @click="goToNextPage" class="text-yellow-300">{{
      currentPage
    }}</span>
    <span
      v-if="currentPage !== 500"
      @click="goToNextPage"
      class="text-white hover:cursor-pointer hover:text-yellow-500"
      >{{ currentPage + 1 }}</span
    >
    <span
      v-if="currentPage !== 500"
      @click="goToNextPage"
      class="bg-yellow-300 text-lg px-4 rounded-md text-black hover:cursor-pointer hover:bg-yellow-200"
      >></span
    >
    <span
      v-if="currentPage !== 500"
      @click="goToLastPage"
      class="text-white hover:cursor-pointer hover:text-yellow-500"
      >Last Page</span
    >
  </div>
</template>

<script setup lang="ts">
import MovieCard from './MovieCard.vue';

import { usePopularMoviesStore } from '../stores/usePopularMoviesStore';
import { computed, onMounted } from 'vue';
import { scrollDown } from '../utils/scrollDown';

const popularMoviesStore = usePopularMoviesStore();
await popularMoviesStore.getMovies();
await popularMoviesStore.getGenres();

const goToNextPage = popularMoviesStore.goToNextPage;
const goToPreviousPage = popularMoviesStore.goToPreviousPage;
const goToLastPage = popularMoviesStore.goToLastPage;
const goToFirstPage = popularMoviesStore.goToFirstPage;

const currentPage = computed(() => popularMoviesStore.currentPage);
const lastPage = computed(() => popularMoviesStore.totalPages);

const movies = computed(() => popularMoviesStore.movies);

onMounted(() => {
  popularMoviesStore.initializePage();
});
</script>
