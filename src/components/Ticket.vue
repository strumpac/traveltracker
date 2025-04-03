<template>
  <div class="container my-5" @click="handleClick">
    <div class="card mb-3" style="max-width: 100%;">
          <div class="card-body">
            <h5 class="card-title">Nome del biglietto</h5>
            <span class="cosaStatica mx-2">In partenza a:</span>
            <span class="mx-2"></span>
            <span class="cosaStatica mx-2">In arrivo a:</span>
            <div class="mx-2">
              <span>Nella data: </span>
              <span style="float: right;">Arrivo: {{ dateTimeE }}</span>
              <span style="float: right;" class="me-4">Partenza: {{ dateTimeS }}</span>
            </div>
          </div>
        </div>
  </div>
</template>

<script>
export default {
  name: 'TicketComponent',
  props: ["dateTimeS", "dateTimeE"],
  methods: {
    handleClick() {
      this.$emit('clicked'); // Emesso un evento quando il rettangolo è cliccato
      console.log('Biglietto cliccato!');
      alert("Biggie Cheese")
    }
  }
}
</script>

<style scoped>

/* .cosaStatica {
  padding-left: 3%;
  padding-right: 2%;
  border-style: inset;
  border-top: 0cm;
  border-bottom: 0cm;
  border-right-color: grey;
  border-left-color: grey;
  border-spacing: 10%;
} */

.card {
  cursor: pointer;
  transition: background-color 0.3s;
}
.card:hover {
  background-color: gray; /* Colore più scuro quando il mouse è sopra */
}
</style>