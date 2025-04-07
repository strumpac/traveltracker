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
            <li class="nav-item">
                <RouterLink class="nav-link" to="/allTravels">Tutti i viaggi</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink class="nav-link" to="/userPage">Utente</RouterLink>
            </li>
          </ul>
        </div>
        <div class="rounded-3 imgPfp me-3">
          <img class="" :src="pfpSrc" alt="pfp">
        </div>
            
      </div>
    </nav>
</template>
  
<script>

  var pfpSrc = "/biggie.png"
  
  export default{
    data(){
      return {
        pfpSrc
      }
    },
  }

</script>
<style scoped>
  .imgPfp{
    width: 3.5vw;
    height: 3.5vw;
    background-color: white;
  }
  img{
    width: 3.5vw;
    height: 3.5vw;
  }
  
</style>