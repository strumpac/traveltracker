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
      invalidDateError: '❌ Inserisci una data nel futuro!',
      suggestionsArr: [],
      suggestionsPart: [],
      departureStation: '',
      arrivalStation: '',
      solutions: [],
      selectedTransport: '1',
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
  },
  methods: {
    async getTrainOrPlanePart(name) {
  if (this.selectedTransport === '1') {
    await this.getStationPart(name);
  } else {
    await this.getAirportPart(name);
  }
},
    async getStationPart(name) {
      console.log(name)
      const url = `http://localhost:8090/api/getStazione/${name}`
      try {
        const response = await fetch(url)
        if (!response.ok) { throw new Error("Erroraccio") }
        else {
          const data = await response.json()
          this.suggestionsPart = data
          console.log(this.suggestionsPart)

        }
      } catch (e) { console.error(e) }
    },
    async getAirportPart(name) {
  const url = `http://localhost:8090/api/getAeroporto/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Errore nella richiesta degli aeroporti");
    const data = await response.json();
    this.suggestionsPart = data.data.map(item => ({
      name: item.name,
      id: item.iataCode
    }));
  } catch (e) {
    console.error(e);
  }
},
    
async getTrainOrPlaneArr(name) {
  if (this.selectedTransport === '1') {
    await this.getStationArr(name);
  } else {
    await this.getAirportArr(name);
  }
},
    async getStationArr(name) {
      console.log(name)
      const url = `http://localhost:8090/api/getStazione/${name}`
      try {
        const response = await fetch(url)
        if (!response.ok) { throw new Error("Erroraccio") }
        else {
          const data = await response.json()
          this.suggestionsArr = data
          console.log(this.suggestionsArr)

        }
      } catch (e) { console.error(e) }
    },
    async getAirportArr(name) {
  const url = `http://localhost:8090/api/getAeroporto/${name}`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Errore nella richiesta degli aeroporti");
    const data = await response.json();
    this.suggestionsArr = data.data.map(item => ({
      name: item.name,
      id: item.iataCode
    }));
  } catch (e) {
    console.error(e);
  }
},
    async setDepartureStation(name, id) {
      console.log(name, id)
      this.departureStation = id
      document.getElementById("inputStartCity").value = name
      this.suggestionsPart = []
      // console.log(this.departureStation)
      this.test()
    },
    async setArrivalStation(name, id) {
      this.arrivalStation = id
      document.getElementById("inputArriveCity").value = name
      this.suggestionsArr = []
      // console.log(this.arrivalStation)
      this.test()
    },
    test() {
      console.log("Stazione partenza : " + this.departureStation)
      console.log("Stazione arrivo : " + this.arrivalStation)
      console.log("Giorno partenza : " + this.selectedDepartureDate)
      console.log("Giorno Arrivo : " + this.selectedReturnDate)
    },
    async search() {
  this.test();
  const adultNumber = document.getElementById("inputAdultNumber").value;
  let childrenNumber = document.getElementById("inputChildrenNumber").value;
  childrenNumber = childrenNumber.replace(/[^0-9]/g, '');


  if (this.selectedTransport === '1') {
    // Richiesta per i biglietti del treno
    try {
      const response = await fetch("http://localhost:8090/api/getTicket", {
        method: "POST",
        body: JSON.stringify({
          departureStation: this.departureStation,
          arrivalStation: this.arrivalStation,
          departureDate: this.selectedDepartureDate,
          returnDate: this.selectedReturnDate,
          adultNumber,
          childrenNumber,
          criteria: "",
          advancedSearchRequest: "",
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8"
        }
      });
      if (!response.ok) throw new Error("Errore nella richiesta dei biglietti del treno");
      const data = await response.json();
      this.solutions = data.solutions;
    } catch (error) {
      console.error("Errore nella richiesta dei biglietti del treno:", error);
    }
  } else {
    // Richiesta per i voli
    try {

      const params = new URLSearchParams({
        start: this.departureStation,
        arrival: this.arrivalStation,
        departureDate: this.selectedDepartureDate,
        returnDate: this.selectedReturnDate,
        adults: adultNumber,
        children: childrenNumber
      });
      const url = `http://localhost:8090/api/getFlights?${params.toString()}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error("Errore nella richiesta dei voli");
      const data = await response.json();
      this.solutions = data;
        } catch (error) {
      console.error("Errore nella richiesta dei voli:", error);
    }
  }
    }
}}

</script>

<template>
  <div class="container mt-4">
    <div style="position: relative; z-index: -99;">
      <div
        id="alert"
        class="alert alert-warning animate__animated animate__fadeInDown"
        role="alert"
        :style="{ display: isAlertVisible ? 'block' : 'none' }"
      >
        {{ alertText }}
      </div>
    </div>

    <!-- SELEZIONE MEZZO -->
    <div class="input-group mb-3">
      <select class="form-select" id="selectMean" v-model="selectedTransport">
        <option value="1">Treno</option>
        <option value="2">Aereo</option>
      </select>

      <!-- CAMPO PARTENZA -->
      <form class="form-floating">
        <input
          id="inputStartCity"
          type="text"
          class="form-control"
          placeholder="Napoli"
          aria-label="Città di partenza"
          autocomplete="off"
          aria-describedby="startCity"
          @input="getTrainOrPlanePart($event.target.value)"
        />
        <label for="inputStartCity">Da</label>
        <ul v-if="suggestionsPart.length > 0" class="dropdown Part">
          <li
            v-for="(station, index) in suggestionsPart"
            :key="index"
            @click="setDepartureStation(station.name, station.id)"
          >
            {{ station.name }}
          </li>
        </ul>
      </form>

      <!-- CAMPO ARRIVO -->
      <form class="form-floating">
        <input
          id="inputArriveCity"
          type="text"
          class="form-control"
          placeholder="Milano"
          aria-label="Città di arrivo"
          autocomplete="off"
          @input="getTrainOrPlaneArr($event.target.value)"
        />
        <label for="inputArriveCity">A</label>
        <ul v-if="suggestionsArr.length > 0" class="dropdown Arr">
          <li
            v-for="(station, index) in suggestionsArr"
            :key="index"
            @click="setArrivalStation(station.name, station.id)"
          >
            {{ station.name }}
          </li>
        </ul>
      </form>

      <!-- DATA PARTENZA -->
      <form class="form-floating">
        <input
          id="inputDepartureDate"
          type="date"
          class="form-control"
          aria-label="Data di partenza"
          v-model="selectedDepartureDate"
        />
        <label for="inputDepartureDate">Partenza</label>
      </form>

      <!-- DATA RITORNO -->
      <form class="form-floating">
        <input
          id="inputReturnDate"
          type="date"
          class="form-control"
          aria-label="Data di ritorno"
          v-model="selectedReturnDate"
        />
        <label for="inputReturnDate">Ritorno</label>
      </form>

      <!-- ADULTI -->
      <form class="form-floating">
        <input
          id="inputAdultNumber"
          type="number"
          min="0"
          value="1"
          class="form-control"
          aria-label="Numero di passeggeri adulti"
        />
        <label for="inputAdultNumber">Adulti</label>
      </form>

      <!-- BAMBINI -->
      <form class="form-floating">
        <input
          id="inputChildrenNumber"
          type="number"
          min="0"
          value="0"
          class="form-control"
          aria-label="Numero di passeggeri bambini"
        />
        <label for="inputChildrenNumber">Bambini</label>
      </form>

      <!-- BOTTONE CERCA -->
      <button class="btn btn-primary" type="button" id="searchButton" @click="search()">
        Cerca
      </button>
    </div>

    <!-- RISULTATI -->
    <div class="train-tickets" style="color: black;">
      <div class="train" v-for="(solution, index) in solutions" :key="index">
        <div class="card" style="margin-bottom: 1rem;">
          <div class="card-body">
            <!-- Treno -->
            <template v-if="selectedTransport === '1'">
              <p style="display: flex;">
                {{ solution.solution.trains[0].acronym }}
                {{ solution.solution.trains[0].description }}
              </p>
              <h5 class="card-title" style="display: flex;">
                {{ solution.solution.origin }}
                <hr
                  style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;"
                />
                {{ solution.solution.duration }}
                <hr
                  style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;"
                />
                {{ solution.solution.destination }}
              </h5>
            </template>

            <!-- Aereo -->
            <template v-else>
              <p style="display: flex;">
                Volo
                {{ solution.itineraries[0].segments[0].carrierCode }}
                {{ solution.itineraries[0].segments[0].flightNumber }}
              </p>
              <h5 class="card-title" style="display: flex;">
                {{ solution.itineraries[0].segments[0].departure.iataCode }}
                <hr
                  style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;"
                />
                {{ solution.itineraries[0].segments[0].departure.at }}
                <hr
                  style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;"
                />
                {{ solution.itineraries[0].segments[0].arrival.iataCode }}
              </h5>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
#alert {
  --animate-duration: 0.5s;
}

.dropdown {
  position: absolute;
  background: "#141414";
  border: 1px solid "#141414";
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1000;
}

.dropdown li {
  padding: 8px;
  cursor: pointer;
}

.dropdown li:hover {
  background-color: #f0f0f0;
  color: black;
}
</style>