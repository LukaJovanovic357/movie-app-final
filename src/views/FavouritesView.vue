<template>
  <div
    v-if="favoriteMovies.length > 0"
    class="grid md:grid-cols-3 lg:grid-cols-4 gap-4 m-3 relative"
  >
    <div class="relative" v-for="movie in favoriteMovies" :key="movie.id">
      <RouterLink :to="`/movies/${movie.id}`">
        <div class="flex flex-col gap-2 mb-2 relative">
          <img :src="getImage(movie.poster_path)" alt="movie-poster" />

          <div class="h-auto hover:bg-gradient-to-b from-gray-900 to-gray-300"></div>
          <div>
            <div class="flex justify-between mb-4 text-xl">
              <p>{{ movie.title }}</p>
              <p>{{ formatDate(movie.release_date) }}</p>
            </div>
            <p class="bg-yellow-300 px-4 py-3 font-bold rounded-md text-black inline">
              {{ parseInt(movie.vote_average).toFixed(1) }} / 10
            </p>
          </div>
        </div>
      </RouterLink>
      <button
        @click="toggleFavorite(movie)"
        class="absolute bg-transparent right-2 top-2 hover:cursor-pointer shadow-md rounded-lg hover:shadow-xl transform hover:scale-110 active:translate-y-1"
      >
        ❌
      </button>
    </div>
  </div>
  <div v-else class="favorites-container">
    <div
      class="font-shadow bg-gradient-to-r shadow-lg flex from-red-500 to transparent flex-col justify-center items-center border-1 bg-black w-1/5 rounded-xl h-1/3 p-10"
    >
      <h1 class="mb-6 text-xl">No Favourites Added</h1>
      <router-link
        class="bg-neutral-800 hover:bg-neutral-700 transition ease-in py-3 px-4 rounded-lg bg-"
        to="/"
        >Select Movies</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavorites } from '../stores/useFavoritesStore';
import { getImage } from '../utils/getImage';
import { computed } from 'vue';
import { RouterLink } from 'vue-router';
import { formatDate } from '../utils/formatDate';

const favoritesStore = useFavorites();
const favoriteMovies = computed(() => favoritesStore.favorites);
const { toggleFavorite } = favoritesStore;
</script>

<style scoped>
.favorites-title {
  text-shadow: 0 0 6px black;
}

.favorites-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100vh;
  background-image: url('../assets/cinema.jpg');
  background-size: cover;
  background-position: center;
  transition: opacity 0.5s ease, filter 0.5s ease;
}

.font-shadow {
  text-shadow: 2px 2px 10px black;
}

.blur {
  filter: blur(3px);
  opacity: 0.8;
}
</style>
