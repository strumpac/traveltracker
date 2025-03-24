<template>
    <nav class="navbar navbar-expand-lg bg-body-tertiary" style="width: 100vw;">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"><RouterLink class="nav-link" to="/">Travel Tracker</RouterLink></a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
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
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">Disabled</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
</template>
  
<style>
</style> 