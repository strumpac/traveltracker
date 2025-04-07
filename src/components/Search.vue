<script>
export default {
  data() {
    return {
      today: '',
      selectedDepartureDate: '',
      selectedReturnDate: '',
      alertDiv: null,
      isAlertVisible: false,
      alertText: '',
      invalidDateError: '❌ Inserisci una data nel futuro!'
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
        <input id="inputStartCity" type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza" aria-describedby="startCity">
        <label for="inputStartCity">Da</label>
      </form>

      <form class="form-floating">
        <input id="inputArriveCity" type="text" class="form-control" placeholder="Milano" aria-label="Città di arrivo">
        <label for="inputArriveCity">A</label>
      </form>

      <form class="form-floating">
        <input id="inputDepartureDate" type="date" class="form-control" aria-label="Data di partenza" v-model="selectedDepartureDate">
        <label for="inputDepartureDate">Partenza</label>
      </form>

      <form class="form-floating">
        <input id="inputReturnDate" type="date" class="form-control" aria-label="Data di ritorno" v-model="selectedReturnDate">
        <label for="inputReturnDate">Ritorno</label>
      </form>

      <form class="form-floating">
        <input id="inputAdultNumber" type="number" min="0" value="0" class="form-control" aria-label="Numero di passeggeri adulti">
        <label for="inputAdultNumber">Adulti</label>
      </form>

      <form class="form-floating">
        <input id="inputChildrenNumber" type="number" min="0" value="0" class="form-control" aria-label="Numero di passeggeri bambini">
        <label for="inputChildrenNumber">Bambini</label>
      </form>

      <button class="btn btn-primary" type="button" id="searchButton">Cerca</button>
    </div>
  </div>
</template>

<style>
  #alert {
    --animate-duration: 0.5s;
  }
</style>