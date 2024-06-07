<template>
  <div class="w-full h-full flex flex-col">
    <router-link :to="`/movies/${movie.id}`">
      <div class="relative group w-full h-full">
        <img
          class="h-full w-full transition rounded-md group-hover:blur-sm cursor-pointer"
          :src="getImage(poster_path)"
        />

        <div
          class="group-hover:opacity-100 transition-opacity opacity-0 absolute left-[-50%] top-[50%] translate-x-[50%] flex flex-col gap-2 w-full font-semibold text-white"
        >
          <div class="w-full flex flex-col items-center justify-center">
            <button>
              <Icon icon="ic:round-play-arrow" width="60" class="hover:text-emerald-600" />
            </button>
          </div>
        </div>

        <div class="absolute top-4 right-4 px-2 bg-emerald-700 py-1 rounded-md">
          <p class="flex items-center gap-1 justify-center">
            <span>{{ vote_average.toFixed(1) }}</span>
            <Icon icon="material-symbols:star-rounded" color="white" />
          </p>
        </div>
      </div>
    </router-link>
    <div>
      <div class="flex space-x-2.5 align-middle mt-2">
        <h1 class="text-xl text-white font-semibold my-2">
          {{ title }}
        </h1>
        <ButtonFavorite :movie="movie" />
      </div>
      <div class="mb-2">
        <span class="text-gray-300 mr-2 pr-2"> {{ findGenres(genre_ids) }} </span>
      </div>
      <p class="text-neutral-400 text-sm">{{ description }}</p>
      <p v-if="movie.overview" class="hover:cursor-pointer" @click="toggleView">
        {{ viewMore ? 'view less' : 'view more' }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getImage } from '../utils/getImage';
import { Icon } from '@iconify/vue';
import { RouterLink } from 'vue-router';
import ButtonFavorite from './ButtonFavorite.vue';
import { computed, ref } from 'vue';
import { usePopularMoviesStore } from '../stores/usePopularMoviesStore';

const { movie } = defineProps(['movie']);
const { overview, vote_average, title, poster_path, genre_ids } = movie;
const viewMore = ref(false);

const description = computed(() => {
  return viewMore.value ? overview : overview.slice(0, 60) + '...';
});

const popularMoviesStore = usePopularMoviesStore();
await popularMoviesStore.getGenres();
const { findGenres } = popularMoviesStore;

const toggleView = () => {
  viewMore.value = !viewMore.value;
};
</script>
