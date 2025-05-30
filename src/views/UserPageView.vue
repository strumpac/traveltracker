<!-- <script setup>
import { ref, inject, onMounted } from 'vue'
import ModalTemplate from '../../Scripts/modalTemplate.vue'



const user = inject('user')
const allTickets = ref([])
const currentTickets = ref([])
const oldTickets = ref([])
const modalOpen = ref(false)


function toFormatDate(msInp) {
  const date = new Date(msInp)
  return date.toLocaleString('it-IT')
}

async function showTratte(ticket) {
  console.dir(ticket.Id)
  try {
    const res = await fetch('http://localhost:8090/api/fetchAllTratteGivenViaggio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdViaggio : ticket.Id
      })
    })

    const data = await res.json()
    console.log(data)
    modalOpen.value = true
    console.log(modalOpen.value)
  }catch(e){console.error(e)}
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
    // console.dir(data)
    allTickets.value = data
    // console.dir(allTickets.value)
    const timeNow = Date.now()

    // currentTickets.value = allTickets.value
    //   .filter(ticket => ticket[1] > timeNow)
    //   .map(([start, end, dep, arr], index) => ({
    //     id: `future-${index}`,
    //     start: toFormatDate(start),
    //     end: toFormatDate(end),
    //     departureCity: dep,
    //     arrivalCity: arr
    //   }))

    // oldTickets.value = allTickets.value
    //   .filter(ticket => ticket[1] <= timeNow)
    //   .map(([start, end, dep, arr], index) => ({
    //     id: `past-${index}`,
    //     start: toFormatDate(start),
    //     end: toFormatDate(end),
    //     departureCity: dep,
    //     arrivalCity: arr
    //   }))
    console.dir(data)
    for(const viaggio in data){
  
      if (new Date(data[viaggio].DataPartenza) < Date.now())
        oldTickets.value.push(data[viaggio])
      else {
        let viaggioData = data[viaggio].GiornoPartenza;  // prendi la stringa ISO

        let giornoPartenzaFix = new Date(viaggioData)
        giornoPartenzaFix.setDate(giornoPartenzaFix.getDate()+1)

        data[viaggio].GiornoPartenza = giornoPartenzaFix.toISOString().split('T')[0]
        
        currentTickets.value.push(data[viaggio]);
      }
    }
    console.dir(currentTickets.value)
      //console.log(`viaggi vecchi: ${oldTickets.value}\nviaggi futuri: ${currentTickets.value}`)
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
          <div v-for="ticket in currentTickets" :key="ticket.Id" class="card shadow-sm border-primary hover-shadow"
            style="cursor: default;" @click="showTratte(ticket)">
            <div class="card-body">
              <h5 class="card-title text-primary mb-2">
                {{ ticket.CittaDiPartenza }} → {{ ticket.CittaDiArrivo }}
              </h5>
              <p class="card-text mb-1"><strong>Data di partenza:</strong> {{ ticket.GiornoPartenza.substring(0,10) }}
              </p>
              <p class="card-text mb-1"><strong>Partenza:</strong> {{ ticket.OrarioPartenza.substring(0,5) }}</p>
              <p class="card-text mb-0"><strong>Arrivo:</strong> {{ ticket.OrarioArrivo.substring(0,5) }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <h3 class="text-secondary mb-3"><i class="bi bi-clock-history me-2"></i> Cronologia viaggi</h3>
        <div v-if="oldTickets.length === 0" class="text-muted fst-italic">Nessun viaggio passato</div>
        <div class="d-flex flex-column gap-3">
          <div v-for="ticket in oldTickets" :key="ticket.Id"
            class="card shadow-sm border-secondary text-muted hover-shadow" style="cursor: default;">
            <div class="card-body">
              <h5 class="card-title mb-2">
                {{ ticket.CittaDiPartenza }} → {{ ticket.CittaDiArrivo }}
              </h5>

              <p class="card-text mb-1"><strong>Data di partenza:</strong> {{ ticket.GiornoPartenza.substring(0,10) }}
              </p>
              <p class="card-text mb-1"><strong>Partenza:</strong> {{ ticket.OrarioPartenza.substring(0,5) }}</p>
              <p class="card-text mb-0"><strong>Arrivo:</strong> {{ ticket.OrarioArrivo.substring(0,5) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">Titolo Modal</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Chiudi"></button>
              </div>
              <div class="modal-body">
                Questo è il contenuto della modal Bootstrap.
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                <button type="button" class="btn btn-primary">Salva cambiamenti</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div></div>
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
</style> -->

<script setup>
import { ref, inject, onMounted } from 'vue'
import ModalTemplate from '../../Scripts/modalTemplate.vue'

const user = inject('user')
const allTickets = ref([])
const currentTickets = ref([])
const oldTickets = ref([])
const showModal = ref(false)
const selectedTicket = ref(null)
const tratte = ref([])

function toFormatDate(msInp) {
  const date = new Date(msInp)
  return date.toLocaleString('it-IT')
}

async function openModal(ticket) {
  selectedTicket.value = ticket
  try {
    const res = await fetch('http://localhost:8090/api/fetchAllTratteGivenViaggio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        IdViaggio: ticket.Id
      })
    })
    const data = await res.json()
    tratte.value = data
    showModal.value = true
  } catch (e) {
    console.error(e)
  }
}

const closeModal = () => {
  showModal.value = false
  selectedTicket.value = null
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

    for (const viaggio in data) {
      if (new Date(data[viaggio].DataPartenza) < Date.now()) {
        oldTickets.value.push(data[viaggio])
      } else {
        let viaggioData = data[viaggio].GiornoPartenza
        let giornoPartenzaFix = new Date(viaggioData)
        giornoPartenzaFix.setDate(giornoPartenzaFix.getDate() + 1)
        data[viaggio].GiornoPartenza = giornoPartenzaFix.toISOString().split('T')[0]
        currentTickets.value.push(data[viaggio])
      }
    }
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
        <h3 class="text-primary mb-3">
          <i class="bi bi-calendar-check-fill me-2"></i> Viaggi futuri
        </h3>
        <div v-if="currentTickets.length === 0" class="text-muted fst-italic">
          Nessun viaggio futuro prenotato
        </div>
        <div class="d-flex flex-column gap-3">
          <div v-for="ticket in currentTickets" :key="ticket.Id" class="card shadow-sm border-primary hover-shadow"
            style="cursor: pointer;" @click="openModal(ticket)">
            <div class="card-body">
              <h5 class="card-title text-primary mb-2">
                {{ ticket.CittaDiPartenza }} → {{ ticket.CittaDiArrivo }}
              </h5>
              <p class="card-text mb-1">
                <strong>Data di partenza:</strong> {{ ticket.GiornoPartenza.substring(0, 10) }}
              </p>
              <p class="card-text mb-1">
                <strong>Partenza:</strong> {{ ticket.OrarioPartenza.substring(0, 5) }}
              </p>
              <p class="card-text mb-0">
                <strong>Arrivo:</strong> {{ ticket.OrarioArrivo.substring(0, 5) }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <h3 class="text-secondary mb-3">
          <i class="bi bi-clock-history me-2"></i> Cronologia viaggi
        </h3>
        <div v-if="oldTickets.length === 0" class="text-muted fst-italic">
          Nessun viaggio passato
        </div>
        <div class="d-flex flex-column gap-3">
          <div v-for="ticket in oldTickets" :key="ticket.Id"
            class="card shadow-sm border-secondary text-muted hover-shadow" style="cursor: pointer;"
            @click="openModal(ticket)">
            <div class="card-body">
              <h5 class="card-title mb-2">
                {{ ticket.CittaDiPartenza }} → {{ ticket.CittaDiArrivo }}
              </h5>
              <p class="card-text mb-1">
                <strong>Data di partenza:</strong> {{ ticket.GiornoPartenza.substring(0, 10) }}
              </p>
              <p class="card-text mb-1">
                <strong>Partenza:</strong> {{ ticket.OrarioPartenza.substring(0, 5) }}
              </p>
              <p class="card-text mb-0">
                <strong>Arrivo:</strong> {{ ticket.OrarioArrivo.substring(0, 5) }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <ModalTemplate v-if="showModal" @close="closeModal">
      <template #header>
        <h3 class="mb-0">Dettagli Viaggio</h3>
      </template>

      <template #default>
        <div v-if="selectedTicket" class="p-3">
          <div class="mb-4">
            <h4 class="mb-3">Informazioni Principali</h4>
            <p class="mb-2"><strong>Partenza:</strong> {{ selectedTicket.CittaDiPartenza }}</p>
            <p class="mb-2"><strong>Arrivo:</strong> {{ selectedTicket.CittaDiArrivo }}</p>
            <p class="mb-2"><strong>Data:</strong> {{ selectedTicket.GiornoPartenza.substring(0, 10) }}</p>
            <p class="mb-2"><strong>Orario partenza:</strong> {{ selectedTicket.OrarioPartenza.substring(0, 5) }}</p>
            <p class="mb-2"><strong>Orario arrivo:</strong> {{ selectedTicket.OrarioArrivo.substring(0, 5) }}</p>
            <!-- <p class="mb-2"><strong>Prezzo:</strong> €{{ selectedTicket.Prezzo }}</p> -->
            <p class="mb-2"><strong>Partecipanti:</strong> {{ selectedTicket.NrPartecipanti }}</p>
          </div>

          <div v-if="tratte.length > 0">
            <h4 class="mb-3">Tratte del Viaggio</h4>
            <div class="tratte-container">
              <div v-for="(tratta, index) in tratte" :key="index" class="card mb-2">
                <div class="card-body">
                  <p class="mb-1"><strong>Mezzo:</strong> {{ tratta.Mezzo }}</p>
                  <p class="mb-1"><strong>Codice:</strong> {{ tratta.CodiceMezzo }}</p>
                  <p class="mb-1"><strong>Da:</strong> {{ tratta.CittaDiPartenza }}</p>
                  <p class="mb-1"><strong>A:</strong> {{ tratta.CittaDiArrivo }}</p>
                  <p class="mb-1"><strong>Partenza:</strong> {{ tratta.OrarioPartenza.substring(0, 5) }}</p>
                  <p class="mb-0"><strong>Arrivo:</strong> {{ tratta.OrarioArrivo.substring(0, 5) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <button class="btn btn-secondary" @click="closeModal">Chiudi</button>
      </template>
    </ModalTemplate>
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

.tratte-container {
  max-height: 300px;
  overflow-y: auto;
  padding-right: 10px;
}

.tratte-container::-webkit-scrollbar {
  width: 8px;
}

.tratte-container::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.tratte-container::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

.tratte-container::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>