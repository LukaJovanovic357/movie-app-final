<script setup lang="ts">
import { useFavorites } from '../stores/useFavoritesStore';

const favoritesStore = useFavorites();
const { toggleFavorite, isFavorite } = favoritesStore;

const props = defineProps(['movie']);
</script>

<template>
  <button
    @click="toggleFavorite(props.movie)"
    :style="{ opacity: isFavorite(props.movie) ? 1 : 0.5 }"
    class="flex text-3xl transition ease-in hover:shadow-xl transform hover:scale-110 active:translate-y-1"
  >
    ❤️
  </button>
</template>
