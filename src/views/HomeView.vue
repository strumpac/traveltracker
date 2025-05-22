<script setup>
import Search from '@/components/Search.vue';
</script>

<template>
  <div id="carouselExampleIndicators" class="carousel slide w-100" data-bs-ride="carousel" data-bs-interval="7000">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="/trainplane.png" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Aereo1.png" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Treno1.jpg" alt="Third slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Aereo2.jpg" alt="Fourth slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Treno2.jpeg" alt="Fifth slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Aereo3.jpg" alt="Sixth slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
    </a>
  </div>

  <Search></Search>
</template>

<style scoped>
.carousel-inner .carousel-item img {
  width: 100vw;
  height: 50vh;
  object-fit: cover;
}

.carousel-item {
  transition: transform 1s ease-in-out;
}

</style>
