<script>
export default {
  data() {
    return {
      today: '',
      selectedDepartureDate: '',
      alertDiv: null,
      isAlertVisible: false,
      alertText: '',
      invalidDateError: '❌ Cannot search in the past!'
    };
  },
  watch: {
    selectedDepartureDate(date) {
      //alert('aaa');
      if (!date || date < this.today) {
        this.alertText = this.invalidDateError;

        this.alertDiv.classList.remove('animate__fadeOutUp');
        this.alertDiv.classList.add('animate__fadeInDown');
        this.isAlertVisible = true;
        this.selectedDepartureDate = '';
      } else {
        this.alertDiv.classList.remove('animate__fadeInDown');
        this.alertDiv.classList.add('animate__fadeOutUp');

        setTimeout(() => {
          this.isAlertVisible = false;
          this.alertText = '';
        }, 500)
      }
    }
  },
  mounted() {
    this.today = new Date().toISOString().split('T')[0];
    this.alertDiv = document.getElementById('alert');
    this.departureDateInput = document.getElementById('departureDate');

    this.selectedDepartureDate = this.today;

    this.$nextTick(() => {
      
    });
    
    // document.getElementById('alert').classList.remove('animate__fadeInDown');
  }
}
</script>

<template>
  <div class="container mt-4">
    <div style="position: relative; z-index: -99;">
      <div id="alert" class="alert alert-warning animate__animated animate__fadeInDown" role="alert" :style="{ display: isAlertVisible ? 'block' : 'none' }">{{ alertText }}</div>
    </div>
    <div class="input-group mb-3">
      <select class="form-select" id="selectMean">
        <option value="1" selected>Treno</option>
        <option value="2">Aereo</option>
      </select>

      <form class="form-floating">
        <input type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza" aria-describedby="startCity">
        <label for="floatingInputValue">Da</label>
      </form>

      <!-- <span class="input-group-text" id="startCity">Da</span>
      <input type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza" aria-describedby="startCity"> -->

      <form class="form-floating">
        <input type="text" class="form-control" placeholder="Milano" aria-label="Città di arrivo" aria-describedby="startCity">
        <label for="floatingInputValue">A</label>
      </form>

      <!-- <span class="input-group-text" id="destinationCity">A</span>
      <input type="text" class="form-control" placeholder="Milano" aria-label="Città di arrivo" aria-describedby="destinationCity"> -->

      <span class="input-group-text" id="departureDate">Partenza</span>
      <input type="date" class="form-control" aria-label="Data di partenza" aria-describedby="departureDate" v-model="selectedDepartureDate">

      <span class="input-group-text" id="returnDate">Ritorno</span>
      <input type="date" class="form-control" aria-label="Data di ritorno" aria-describedby="returnDate">

      <span class="input-group-text" id="adultNumber">Adulti</span>
      <input type="number" class="form-control" min="0" value="1" aria-label="Numero di passeggeri adulti" aria-describedby="adultNumber">

      <span class="input-group-text" id="childNumber">Bambini</span>
      <input type="number" class="form-control" min="0" value="0" aria-label="Numero di passeggeri adulti" aria-describedby="childNumber">

      <button class="btn btn-primary" type="button" id="searchButton">Cerca</button>
    </div>
  </div>
</template>

<style>
  #alert {
    --animate-duration: 0.5s;
  }
</style>