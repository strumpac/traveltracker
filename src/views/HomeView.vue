<script setup>
import Search from '@/components/Search.vue';

  var trainActive = true

  function changeActive(){
    trainActive = !trainActive
  }
  
</script>

<template>

  <div v-if="trainActive == true" id="carouselTrainIndicators" class="carousel slide w-100" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="/locomotiva.jpg" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Treno1.jpg" alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="/background/Treno2.jpeg" alt="Third slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselTrainIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" ></span>
    </a>
    <a class="carousel-control-next" href="#carouselTrainIndicators" role="button" data-slide="next">
      <span class="carousel-control-next-icon" ></span>
    </a>
  </div>

  <div v-if="trainActive == false" id="carouselPlaneIndicators" class="carousel slide w-100" data-ride="carousel">
    <ol class="carousel-indicators">
      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    </ol>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img class="d-block w-100" src="/locomotiva.jpg" alt="First slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="..." alt="Second slide">
      </div>
      <div class="carousel-item">
        <img class="d-block w-100" src="..." alt="Third slide">
      </div>
    </div>
    <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    </a>
    <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
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


</style>
