<template>
  <div class="container mt-3" id="rettangolo" @click="handleClick">
    <div class="tappa">
      Partenza
    </div>
    <div class="tappa">
      arrivo
    </div>
  </div>
</template>

<script>
export default {
  name: 'RettangoloComponent',
  methods: {
    handleClick() {
      this.$emit('clicked'); // Emesso un evento quando il rettangolo è cliccato
      console.log('Rettangolo cliccato!');
    }
  }
}
</script>

<style scoped>
#rettangolo {
  width: 70%;
  height: 50px;
  border-radius: 15px; /* Bordo curvato */
  border-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  cursor: pointer; /* Cambia il cursore per far capire che è cliccabile */
  background-color: #3ce67d;
  transition: background-color 0.3s;
}

.tappa {
  margin: 5%;
  border-radius: 5px;
  border-color: black;
}
#rettangolo:hover {
  background-color: #45a049; /* Colore più scuro quando il mouse è sopra */
}
</style>
