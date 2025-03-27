<script>
export default {
  data() {
    return {
      isAlertVisible: false,
      today: '',
      selectedDepartureDate: ''
    };
  },
  watch: {
    selectedDepartureDate(date) {
      //alert('aaa');
      if (!date || date < this.today) {
        this.isAlertVisible = true;
        this.selectedDepartureDate = '';
      } else {
        this.isAlertVisible = false;
      }
    }
  },
  mounted() {
    this.today = new Date().toISOString().split('T')[0];
    this.$nextTick(() => {
      document.getElementById('departureDate').min = this.today;
    });
    console.log(document.getElementById('departureDate').min);
  }
}
</script>

<template>
  <div id="alert" class="alert alert-warning" role="alert" :style="{ display: isVisible ? 'block' : 'none' }">
    Cannot search in the past
  </div>
  <div class="container mt-4">
    <div class="input-group mb-3">
      <span class="input-group-text" id="startCity">Da</span>
      <input type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza" aria-describedby="startCity">
      <span class="input-group-text" id="destinationCity">A</span>
      <input type="text" class="form-control" placeholder="Milano" aria-label="Città di arrivo" aria-describedby="destinationCity">
      <span class="input-group-text" id="departureDate">Partenza</span>
      <input type="date" class="form-control" aria-label="Data di partenza" aria-describedby="departureDate" v-model="selectedDepartureDate">
      <span class="input-group-text" id="returnDate">Ritorno</span>
      <input type="date" class="form-control" aria-label="Data di ritorno" aria-describedby="returnDate">
      <span class="input-group-text" id="passengerNumber">Ritorno</span>
      <input type="number" class="form-control" min="1" value="1" aria-label="Numero di passeggeri" aria-describedby="passengerNumber">
    </div>
  </div>
</template>

<style>
</style>