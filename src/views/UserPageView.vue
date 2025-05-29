<script setup>
import { ref, inject, onMounted } from 'vue'

const user = inject('user')
const allTickets = ref([])
const currentTickets = ref([])
const oldTickets = ref([])

function toFormatDate(msInp) {
  const date = new Date(msInp)
  return date.toLocaleString('it-IT')
}

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:8090/api/fetchAllViaggiGivenUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        UsernameCliente: user.value[0].Username
      })
    })

    const data = await res.json()
    allTickets.value = data

    const timeNow = Date.now()

    currentTickets.value = allTickets.value
      .filter(ticket => ticket[1] > timeNow)
      .map(([start, end, dep, arr], index) => ({
        id: `future-${index}`,
        start: toFormatDate(start),
        end: toFormatDate(end),
        departureCity: dep,
        arrivalCity: arr
      }))

    oldTickets.value = allTickets.value
      .filter(ticket => ticket[1] <= timeNow)
      .map(([start, end, dep, arr], index) => ({
        id: `past-${index}`,
        start: toFormatDate(start),
        end: toFormatDate(end),
        departureCity: dep,
        arrivalCity: arr
      }))
  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
  <div class="container py-4">
    <div class="d-flex align-items-center mb-4">
      <h1 class="fw-bold me-auto">Area riservata</h1>
      <div class="d-flex align-items-center">
        <span class="fw-semibold fs-5">Bentornato, {{ user[0].Nome || 'Utente' }}!</span>
      </div>
    </div>

    <hr />

    <div class="row gy-4">
      <div class="col-md-6">
        <h3 class="text-primary mb-3"><i class="bi bi-calendar-check-fill me-2"></i> Viaggi futuri</h3>
        <div v-if="currentTickets.length === 0" class="text-muted fst-italic">Nessun viaggio futuro prenotato</div>
        <div class="d-flex flex-column gap-3">
          <div
            v-for="ticket in currentTickets"
            :key="ticket.id"
            class="card shadow-sm border-primary hover-shadow"
            style="cursor: default;"
          >
            <div class="card-body">
              <h5 class="card-title text-primary mb-2">
                {{ ticket.departureCity }} → {{ ticket.arrivalCity }}
              </h5>
              <p class="card-text mb-1"><strong>Partenza:</strong> {{ ticket.start }}</p>
              <p class="card-text mb-0"><strong>Arrivo:</strong> {{ ticket.end }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <h3 class="text-secondary mb-3"><i class="bi bi-clock-history me-2"></i> Cronologia viaggi</h3>
        <div v-if="oldTickets.length === 0" class="text-muted fst-italic">Nessun viaggio passato</div>
        <div class="d-flex flex-column gap-3">
          <div
            v-for="ticket in oldTickets"
            :key="ticket.id"
            class="card shadow-sm border-secondary text-muted hover-shadow"
            style="cursor: default;"
          >
            <div class="card-body">
              <h5 class="card-title mb-2">
                {{ ticket.departureCity }} → {{ ticket.arrivalCity }}
              </h5>
              <p class="card-text mb-1"><strong>Partenza:</strong> {{ ticket.start }}</p>
              <p class="card-text mb-0"><strong>Arrivo:</strong> {{ ticket.end }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hover-shadow:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 123, 255, 0.3);
  transition: box-shadow 0.3s ease-in-out;
}

.card.border-primary {
  border-width: 2px !important;
}

.card.border-secondary {
  border-width: 1.5px !important;
}
</style>
