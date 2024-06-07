<template>
  <NavbarVue />
  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import NavbarVue from './components/NavbarVue.vue';
</script>
