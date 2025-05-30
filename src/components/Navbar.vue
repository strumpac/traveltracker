<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="width: 100vw;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <RouterLink class="nav-link" to="/">
            <img src="/logo.png" alt="Logo">
          </RouterLink>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse w-100" style="display: inline;" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <RouterLink class="nav-link active" aria-current="page" to="/">Home</RouterLink>
            </li>
            <li class="nav-item mx-3">
                <RouterLink class="nav-link" to="/allTravels">Tutti i viaggi</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/userPage">Utente</RouterLink>
            </li>
          </ul>
        </div>

        <RouterLink v-if="!isLogged" class="nav-link me-3" to="/login" ><i class="bi bi-box-arrow-right h1"></i></RouterLink>
        <a v-else @click="logout()"><i class="bi bi-box-arrow-left h1"></i></a>            
      </div>
    </nav>
</template>
  
<script setup>
import {inject, onMounted} from 'vue'
const isLogged = inject('isLogged')
const user = inject('user')


const logout = () => {
  isLogged.value = false
  user.value = []
}
</script>
<style scoped>
  .imgPfp{
    width: 2.5vw;
    height: 2.5vw;
    background-color: white;
  }
  img{
    width: 2.5vw;
    height: 2.5vw;
  }
  
</style>