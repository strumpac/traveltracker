
<template>
  <div v-if="isLoading" class="my-4 text-center">
    <span class="spinner-border" role="status" aria-hidden="true"></span>
    <span class="ms-2">Caricamento voli in corso...</span>
  </div>

  <div v-else>
    <slot :flights="formattedFlights"></slot>
  </div>

  <button class="btn btn-success mb-3" @click="fetchFlights">
  🔄 Nuovi voli casuali
</button>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

const isLoading = ref(true)
const flights = ref([])

const formattedFlights = computed(() =>
  flights.value.map((f, i) => ({
    code: `FL${1000 + i}`,
    departureCity: f.itineraries[0].segments[0].departure.iataCode,
    departureDate: new Date(f.itineraries[0].segments[0].departure.at).toLocaleString(),
    arrivalCity: f.itineraries[0].segments.at(-1).arrival.iataCode,
    arrivalDate: new Date(f.itineraries[0].segments.at(-1).arrival.at).toLocaleString(),
    type: 'Aereo'
  }))
)

async function fetchFlights() {
  isLoading.value = true;
  try {
    const response = await fetch('http://localhost:8090/api/getRandomFlights');
    const data = await response.json();
    flights.value = data.data || [];
  } catch (error) {
    console.error('Errore nel caricamento dei voli:', error);
  } finally {
    isLoading.value = false;
  }
}

onMounted(fetchFlights); // prima chiamata automatica


onMounted(async () => {
  try {
    const response = await fetch('http://localhost:8090/api/getRandomFlights')
    const data = await response.json()
    flights.value = data.data || []
  } catch (error) {
    console.error('Errore nel caricamento dei voli:', error)
  } finally {
    isLoading.value = false
  }
})
</script>
