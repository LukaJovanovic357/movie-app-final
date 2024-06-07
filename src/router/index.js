import { createRouter, createWebHistory } from 'vue-router';
import MovieVue from '@/views/MovieView.vue';
import HomeView from '@/views/HomeView.vue';
import FavoritesVue from '@/views/FavouritesView.vue';
import TopRatedView from '@/views/TopRatedView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/movies/:id',
      name: 'movies',
      component: MovieVue
    },
    {
      path: '/favourites',
      name: 'favourites',
      component: FavoritesVue
    },
    {
      path: '/top-rated',
      name: 'top-rated',
      component: TopRatedView
    }
  ]
});

export default router;
