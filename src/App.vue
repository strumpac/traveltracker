<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
import { provide, ref } from 'vue'
const userData = ref([])
const isLogged = ref(false)
provide('user', userData)
provide('isLogged', isLogged)
</script>

<template>
  <header>
    <Navbar></Navbar>
  </header>

  <RouterView />
</template>

<style>
body
{
    overflow: hidden;
    overflow-y: scroll;
}
</style>