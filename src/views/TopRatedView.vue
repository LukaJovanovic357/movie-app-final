<template>
  <main>
    <!-- filter component -->
    <div class="w-full mx-auto px-12 md:px-20 lg:px-28">
      <div class="genre-select mt-5 mx-auto">
        <select
          class="text-gray-900 rounded-md"
          id="genre"
          v-model="selectedGenre"
          @change="filterMovies"
        >
          <option value="all" selected>All</option>
          <option
            id="genre"
            class="text-gray-900"
            v-for="genre in genres"
            :key="genre.id"
            :value="genre.id"
          >
            {{ genre.name }}
          </option>
        </select>
      </div>
    </div>
    <!-- filter component -->
    <div
      class="w-full h-full grid p-10 md:grid-cols-2 lg:grid-cols-3 justify-items-center align-items-center"
    >
      <div v-if="filteredMovies.length > 0" v-for="movie in filteredMovies">
        <div class="flex flex-col md:w-[330px] lg:w-[300px] xl:w-[400px]">
          <div class="mx-auto max-w-[450px]">
            <img class="w-full rounded-md" :src="getImage(movie.poster_path)" />
          </div>
          <div class="w-full mt-2 mb-4">
            <div class="flex justify-starts items-center gap-2">
              <h2 class="text-white">{{ movie.title }}:</h2>
              <p>{{ formatDate(movie.release_date) }}</p>
              <p class="py-1 px-3 ml-4 text-black bg-yellow-300 w-14 rounded-lg text-center">
                {{ movie.vote_average.toFixed(1) }}
              </p>
            </div>
            <p class="mt-1 text-gray-400">{{ findGenres(movie.genre_ids) }}</p>
          </div>
        </div>
      </div>
      <img
        v-if="filteredMovies.length"
        @click="scrollDown"
        class="absolute top-13 right-0 md:top-13 md:right-0 lg:top-13 lg:right-3 xl:right-8 hover:cursor-pointer"
        width="50"
        src="../assets/arrowDown.png"
        alt="arrow-down"
      />
    </div>
    <div v-if="!filteredMovies.length" class="h-2/4 w-full flex justify-center mb-[250px]">
      <h1 class="text-2xl mt-20">No movies for selected genre</h1>
    </div>
  </main>
  <footer>
    <div class="flex justify-center items-center gap-3 p-5">
      <span
        v-if="currentPage !== 1"
        @click="goToFirstPage"
        class="text-white hover:cursor-pointer hover:text-yellow-500"
        >First Page
      </span>
      <span
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
      <span @click="goToNextPage" class="text-yellow-300">{{ currentPage }}</span>
      <span
        v-if="currentPage !== lastPage"
        @click="goToNextPage"
        class="text-white hover:cursor-pointer hover:text-yellow-500"
        >{{ currentPage + 1 }}</span
      >
      <span
        @click="goToNextPage"
        class="bg-yellow-300 text-lg px-4 rounded-md text-black hover:cursor-pointer hover:bg-yellow-200"
        >></span
      >
      <span
        v-if="currentPage !== lastPage"
        @click="goToLastPage"
        class="text-white hover:cursor-pointer hover:text-yellow-500"
        >Last Page</span
      >
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useTopRatedStore } from '../stores/useTopRatedStore';
import { getImage } from '../utils/getImage';
import { formatDate } from '../utils/formatDate';
import { computed, onMounted, watch, ref } from 'vue';
import { scrollDown } from '../utils/scrollDown';
import { usePopularMoviesStore } from '../stores/usePopularMoviesStore';

const topRatedStore = useTopRatedStore();
topRatedStore.getMovies();
const popularMovieStore = usePopularMoviesStore();
popularMovieStore.getGenres();
const { findGenres } = popularMovieStore;

const goToNextPage = topRatedStore.goToNextPage;
const goToPreviousPage = topRatedStore.goToPreviousPage;
const goToLastPage = topRatedStore.goToLastPage;
const goToFirstPage = topRatedStore.goToFirstPage;

const currentPage = computed(() => topRatedStore.currentPage);
const lastPage = computed(() => topRatedStore.totalPages);

const filteredMovies = computed(() => topRatedStore.filteredMovies);
const genres = ref(popularMovieStore.genres);

const selectedGenre = ref<number | string>('all');

const filterMovies = () => {
  topRatedStore.filterMoviesByGenre(selectedGenre.value);
};

watch(selectedGenre, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    filterMovies();
  }
});

onMounted(() => {
  topRatedStore.initializePage();
});
</script>

<style scoped>
.border-right {
  border-right: 1px solid #fff;
}
</style>
