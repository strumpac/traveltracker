<script setup>
import { ref, computed } from 'vue'
import SearchAll from '@/components/SearchAll.vue'

const typeFilter = ref('all')
const cityList = ['Roma', 'Milano', 'Napoli', 'Torino', 'Bologna', 'Firenze', 'Venezia', 'Genova', 'Verona']

function getRndIntegerInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Viaggi treno finti
const fakeTrains = ref([])

function generateRandomTrains(amount) {
  for (let i = 0; i < amount; i++) {
    const code = Math.floor(Math.random() * 9000) + 1000
    const departureDate = new Date()
    departureDate.setDate(departureDate.getDate() + getRndIntegerInclusive(1, 7))
    const arrivalDate = new Date(departureDate)
    arrivalDate.setHours(arrivalDate.getHours() + 2)

    let departureCity = cityList[getRndIntegerInclusive(0, cityList.length - 1)]
    let arrivalCity = cityList[getRndIntegerInclusive(0, cityList.length - 1)]
    while (arrivalCity === departureCity) {
      arrivalCity = cityList[getRndIntegerInclusive(0, cityList.length - 1)]
    }

    fakeTrains.value.push({
      type: 'Treno',
      code: `TR${code}`,
      departureCity,
      departureDate: departureDate.toLocaleString(),
      arrivalCity,
      arrivalDate: arrivalDate.toLocaleString(),
    })
  }
}

generateRandomTrains(10)
</script>

<template>
  <div class="container py-5">
    <div class="card p-4 shadow-lg mb-5">
      <div class="d-flex align-items-center mb-4">
        <h2 class="me-auto">📋 Lista dei viaggi</h2>
        <div class="btn-group" role="group">
          <input type="radio" class="btn-check" name="filter" id="all" autocomplete="off" checked @click="typeFilter = 'all'">
          <label class="btn btn-outline-secondary" for="all">Tutti 🔀</label>

          <input type="radio" class="btn-check" name="filter" id="aereo" autocomplete="off" @click="typeFilter = 'Aereo'">
          <label class="btn btn-outline-info" for="aereo">Aerei 🛫</label>

          <input type="radio" class="btn-check" name="filter" id="treno" autocomplete="off" @click="typeFilter = 'Treno'">
          <label class="btn btn-outline-success" for="treno">Treni 🚃</label>
        </div>
      </div>

      <SearchAll v-slot="{ flights: airTravels, isLoading }">
        <div v-if="isLoading" class="text-center my-4">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Caricamento...</span>
          </div>
        </div>

        <div v-else class="table-responsive">
          <table class="table table-hover table-bordered align-middle text-center">
            <thead class="table-dark">
              <tr>
                <th>Codice</th>
                <th>Partenza</th>
                <th>Data & Ora Partenza</th>
                <th>Arrivo</th>
                <th>Data & Ora Arrivo</th>
                <th>Tipo</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in [...airTravels, ...fakeTrains].filter(el => typeFilter === 'all' || el.type === typeFilter)"
                :key="index"
              >
                <td>{{ item.code }}</td>
                <td>{{ item.departureCity }}</td>
                <td>{{ item.departureDate }}</td>
                <td>{{ item.arrivalCity }}</td>
                <td>{{ item.arrivalDate }}</td>
                <td>
                  <span :class="item.type === 'Treno' ? 'badge bg-success' : 'badge bg-info'">
                    {{ item.type }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </SearchAll>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
}

.card {
  border-radius: 1rem;
}

table {
  font-size: 0.95rem;
}

input[type="radio"]:checked + label {
  font-weight: bold;
  box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
}
</style>
