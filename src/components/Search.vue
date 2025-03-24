<script>
export default {
  mounted() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('departureDate').min = today;
    console.log(document.getElementById('departureDate').min);
  }
}
</script>

<template>
  <div class="container mt-4">
    <div class="input-group mb-3">
      <span class="input-group-text" id="startCity">Da</span>
      <input type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza" aria-describedby="startCity">
      <span class="input-group-text" id="destinationCity">A</span>
      <input type="text" class="form-control" placeholder="Milano" aria-label="Città di arrivo" aria-describedby="destinationCity">
      <span class="input-group-text" id="departureDate">Partenza</span>
      <input type="date" class="form-control" aria-label="Data di partenza" aria-describedby="departureDate">
      <span class="input-group-text" id="returnDate">Ritorno</span>
      <input type="date" class="form-control" aria-label="Data di ritorno" aria-describedby="returnDate">
      <span class="input-group-text" id="passengerNumber">Ritorno</span>
      <input type="number" class="form-control" min="1" value="1" aria-label="Numero di passeggeri" aria-describedby="passengerNumber">
    </div>
  </div>
</template>

<style>
</style>