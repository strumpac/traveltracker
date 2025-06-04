<template>
  <div class="container mt-4">
    <div style="position: relative; z-index: -99;">
      <div id="alert" class="alert alert-warning animate__animated animate__fadeInDown" role="alert"
        :style="{ display: isAlertVisible ? 'block' : 'none' }">
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
        <input id="inputStartCity" type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza"
          autocomplete="off" aria-describedby="startCity" @input="getTrainOrPlanePart($event.target.value)" />
        <label for="inputStartCity">Da</label>
        <ul v-if="suggestionsPart.length > 0" class="dropdown Part">
          <li v-for="(station, index) in suggestionsPart" :key="index"
            @click="setDepartureStation(station.name, station.id)">
            {{ station.name }}
          </li>
        </ul>
      </form>

      <!-- CAMPO ARRIVO -->
      <form class="form-floating">
        <input id="inputArriveCity" type="text" class="form-control" placeholder="Milano" aria-label="Città di arrivo"
          autocomplete="off" @input="getTrainOrPlaneArr($event.target.value)" />
        <label for="inputArriveCity">A</label>
        <ul v-if="suggestionsArr.length > 0" class="dropdown Arr">
          <li v-for="(station, index) in suggestionsArr" :key="index"
            @click="setArrivalStation(station.name, station.id)">
            {{ station.name }}
          </li>
        </ul>
      </form>

      <!-- DATA PARTENZA -->
      <form class="form-floating">
        <input id="inputDepartureDate" type="date" class="form-control" aria-label="Data di partenza"
          v-model="selectedDepartureDate" />
        <label for="inputDepartureDate">Partenza</label>
      </form>

      <!-- DATA RITORNO -->
      <form class="form-floating">
        <input id="inputReturnDate" type="date" class="form-control" aria-label="Data di ritorno"
          v-model="selectedReturnDate" />
        <label for="inputReturnDate">Ritorno</label>
      </form>

      <!-- ADULTI -->
      <form class="form-floating">
        <input id="inputAdultNumber" type="number" min="0" value="1" class="form-control"
          aria-label="Numero di passeggeri adulti" />
        <label for="inputAdultNumber">Adulti</label>
      </form>

      <!-- BAMBINI -->
      <form class="form-floating">
        <input id="inputChildrenNumber" type="number" min="0" value="0" class="form-control"
          aria-label="Numero di passeggeri bambini" />
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
              <div style="display: flex; align-items: center; margin-top: auto;">
                <h5 class="card-title mb-0" style="display: flex; align-items: center; flex: 1;">
                  {{ solution.solution.origin }}
                  <hr style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;" />
                  {{ solution.solution.duration }}
                  <hr style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;" />
                  {{ solution.solution.destination }}
                </h5>
                <button class="btn btn-primary ms-3" @click="buyTicket(1, solution)">Compra</button>
              </div>
            </template>


            <!-- Aereo -->
            <template v-else>
              <p style="display: flex;">
                Volo
                {{ solution.itineraries[0].segments[0].carrierCode }}
                {{ solution.itineraries[0].segments[0].flightNumber }}
              </p>
              <div style="display: flex; align-items: center; margin-top: auto;">
                <h5 class="card-title mb-0" style="display: flex; align-items: center; flex: 1;">
                  {{ solution.itineraries[0].segments[0].departure.iataCode }}
                  <hr style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;" />
                  {{ solution.itineraries[0].segments[0].departure.at }}
                  <hr style="width: 3rem; border-top: 2px dotted white; margin-left: 1rem; margin-right: 1rem;" />
                  {{ solution.itineraries[0].segments[0].arrival.iataCode }}
                </h5>
                <button class="btn btn-primary ms-3" @click="buyTicket(2, solution)">Compra</button>
              </div>
            </template>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, inject } from 'vue'

const today = ref('')
const selectedDepartureDate = ref('')
const selectedReturnDate = ref('')
const isAlertVisible = ref(false)
const alertText = ref('')
const alertDiv = ref(null)

const invalidDateError = '❌ Inserisci una data nel futuro!'
const suggestionsArr = ref([])
const suggestionsPart = ref([])
const departureStation = ref('')
const arrivalStation = ref('')
const solutions = ref([])
const user = inject('user')
const selectedTransport = ref('1')

onMounted(() => {
  today.value = new Date().toISOString().split('T')[0]
  selectedDepartureDate.value = today.value
  alertDiv.value = document.getElementById('alert')
})

watch(selectedDepartureDate, (date) => {
  if (!date || date < today.value) {
    alertText.value = invalidDateError
    alertDiv.value.classList.remove('animate__fadeOutUp')
    alertDiv.value.classList.add('animate__fadeInDown')
    isAlertVisible.value = true
    selectedDepartureDate.value = ''
  } else {
    alertDiv.value.classList.remove('animate__fadeInDown')
    alertDiv.value.classList.add('animate__fadeOutUp')
    setTimeout(() => {
      isAlertVisible.value = false
      alertText.value = ''
    }, 500)
  }
})

async function getTrainOrPlanePart(name) {
  if (selectedTransport.value === '1') await getStationPart(name)
  else await getAirportPart(name)
}

async function getStationPart(name) {
  try {
    const response = await fetch(`http://localhost:8090/api/getStazione/${name}`)
    if (!response.ok) throw new Error('Errore')
    const data = await response.json()
    suggestionsPart.value = data
  } catch (e) {
    console.error(e)
  }
}

async function getAirportPart(name) {
  try {
    const response = await fetch(`http://localhost:8090/api/getAeroporto/${name}`)
    if (!response.ok) throw new Error('Errore')
    const data = await response.json()
    suggestionsPart.value = data.data.map(item => ({ name: item.name, id: item.iataCode }))
  } catch (e) {
    console.error(e)
  }
}

async function getTrainOrPlaneArr(name) {
  if (selectedTransport.value === '1') await getStationArr(name)
  else await getAirportArr(name)
}

async function getStationArr(name) {
  try {
    const response = await fetch(`http://localhost:8090/api/getStazione/${name}`)
    if (!response.ok) throw new Error('Errore')
    const data = await response.json()
    suggestionsArr.value = data
  } catch (e) {
    console.error(e)
  }
}

async function buyTicket(type, data) {
  //dati dell'utente, citta di partenza, citta di arrivo, prezzo, nr partecipanti, punti accumulati 
  let formData
  if(type==1){
    console.log(type)
    const origin = data.solution.origin
    const destination = data.solution.destination
  const departureTime = data.solution.departureTime
  const arrivalTime = data.solution.arrivalTime
  const nodes = data.solution.nodes
  console.dir(user.value)
  console.log(user.value[0].Username)
  // console.dir(user.value)
  console.log(origin, destination, departureTime, arrivalTime)
  console.log(data)
  formData = {
      Cliente: user.value[0].Username,
      CittaDiPartenza: origin,
      CittaDiArrivo: destination,
      Prezzo: 0,
      NrPartecipanti: 1,
      PuntiAccumulati: 0,
      tratte: data.solution.nodes,
      GiornoPartenza: selectedDepartureDate.value
    }
      const response = await fetch("http://localhost:8090/api/addViaggio", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }

  if(type==2){
      console.log(data.itineraries[0].segments[0].departure.iataCode, data.itineraries[0].segments[0].arrival.iataCode)
      const origin = data.itineraries[0].segments[0].departure.iataCode
      const destination = data.itineraries[0].segments[0].arrival.iataCode
      const OrarioPartenza = data.itineraries[0].segments[0].departure.at
      const OrarioArrivo = data.itineraries[0].segments[0].arrival.at
      formData = {
      Cliente: user.value[0].Username,
      CittaDiPartenza: origin,
      CittaDiArrivo: destination,
      Prezzo: 0,
      NrPartecipanti: 1,
      PuntiAccumulati: 0,
      GiornoPartenza: selectedDepartureDate.value,
      OrarioPartenza: OrarioPartenza,
      OrarioArrivo: OrarioArrivo
    }
    console.log(formData)
      const response = await fetch("http://localhost:8090/api/AddViaggioAereo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(formData)
  })
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  }



  }

async function getAirportArr(name) {
  try {
    const response = await fetch(`http://localhost:8090/api/getAeroporto/${name}`)
    if (!response.ok) throw new Error('Errore')
    const data = await response.json()
    suggestionsArr.value = data.data.map(item => ({ name: item.name, id: item.iataCode }))
  } catch (e) {
    console.error(e)
  }
}

function setDepartureStation(name, id) {
  departureStation.value = id
  document.getElementById('inputStartCity').value = name
  suggestionsPart.value = []
  test()
}

function setArrivalStation(name, id) {
  arrivalStation.value = id
  document.getElementById('inputArriveCity').value = name
  suggestionsArr.value = []
  test()
}

function test() {
  console.log('Stazione partenza:', departureStation.value)
  console.log('Stazione arrivo:', arrivalStation.value)
  console.log('Giorno partenza:', selectedDepartureDate.value)
  console.log('Giorno arrivo:', selectedReturnDate.value)
}

async function search() {
  test()
  const adultNumber = document.getElementById('inputAdultNumber').value
  let childrenNumber = document.getElementById('inputChildrenNumber').value
  childrenNumber = childrenNumber.replace(/[^0-9]/g, '')

  if (selectedTransport.value === '1') {
    try {
      const response = await fetch('http://localhost:8090/api/getTicket', {
        method: 'POST',
        body: JSON.stringify({
          departureStation: departureStation.value,
          arrivalStation: arrivalStation.value,
          departureDate: selectedDepartureDate.value,
          returnDate: selectedReturnDate.value,
          adultNumber,
          childrenNumber,
          criteria: '',
          advancedSearchRequest: ''
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
      if (!response.ok) throw new Error('Errore treno')
      const data = await response.json()
      solutions.value = data.solutions
    } catch (e) {
      console.error(e)
    }
  } else {
    try {
      const params = new URLSearchParams({
        start: departureStation.value,
        arrival: arrivalStation.value,
        departureDate: selectedDepartureDate.value,
        returnDate: selectedReturnDate.value,
        adults: adultNumber,
        children: childrenNumber
      })
      const response = await fetch(`http://localhost:8090/api/getFlights?${params.toString()}`)
      if (!response.ok) throw new Error('Errore volo')
      const data = await response.json()
      solutions.value = data
    } catch (e) {
      console.error(e)
    }
  }
}
</script>

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
