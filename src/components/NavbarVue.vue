<template>
  <nav
    class="w-full text-xl ml-2 md:top-4 flex z-10 text-white items-center md:gap-20 md:px-4 py-4 bg-transparent border-b-2 border-neutral-600"
  >
    <div @click="goToHomepage" class="flex items-center text-3xl font-bold gap-2 cursor-pointer">
      <Icon icon="mingcute:movie-line" width="40" class="hidden cursor-pointer md:block" />
      <span class="hidden md:block">Movies</span>
    </div>
    <ul class="flex items-center gap-4 font-semibold">
      <li :class="{ 'current-page': isHomePage }" class="hover:text-[#FACA15] transition">
        <RouterLink to="/">Home</RouterLink>
      </li>
      <li :class="{ 'current-page': isFavoritesPage }" class="hover:text-[#FACA15] transition">
        <RouterLink to="/favourites">Favourite Movies</RouterLink>
      </li>
      <li :class="{ 'current-page': isTopRated }" class="hover:text-[#FACA15] transition">
        <RouterLink to="/top-rated">Top Rated</RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRouter, useRoute } from 'vue-router';
import { computed } from 'vue';

const router = useRouter();
const route = useRoute();

const isHomePage = computed(() => route.path === '/');
const isFavoritesPage = computed(() => route.path === '/favourites');
const isTopRated = computed(() => route.path === '/top-rated');

function goToHomepage() {
  router.push('/');
}
</script>

<style scoped>
.nav-route {
  transition: background-color 0.3s, text-shadow 0.3s;
}

.nav-route:hover {
  background-color: white;
  text-shadow: 2px 2px 4px rgb(252 252 252 / 50%);
}

.current-page {
  color: #faca15;
}
</style>
