<template>
  <div class="container my-5" @click="handleClick">
    <div class="card mb-3" style="max-width: 100%;">
      <div class="row g-0">
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">Nome del biglietto</h5>
            <span class="mx-3"> caio </span>
            <span> tizio </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketComponent',
  methods: {
    handleClick() {
      this.$emit('clicked'); // Emesso un evento quando il rettangolo è cliccato
      console.log('Biglietto cliccato!');
    }
  }
}
</script>

<style scoped>

.card {
  cursor: pointer;
  transition: background-color 0.3s;
}
.card:hover {
  background-color: gray; /* Colore più scuro quando il mouse è sopra */
}
</style>