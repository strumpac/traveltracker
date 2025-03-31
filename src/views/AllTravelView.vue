<script setup>
import { onMounted } from 'vue'
const townList = ['Cervia', 'Cesena', 'Santa Maria Nuova Spallicci di Bertinoro Centro', 'Crocevia Ciarpame', 'Napoli', 'Massachussets Institute of Technology', 'Nessus'];
  // document.getElementById('datetry').innerHTML = Date.now.toLocaleString()
onMounted(() => {
})
</script>

<template>
  <div class="vertFlex">
    <div class="horzFlex">
      <h1>Lista dei viaggi</h1>
      <div class="spacer"></div>
      <input type="radio" class="btn-check" name="options-base" id="trainsCheck" autocomplete="off" checked>
      <label class="btn" for="trainsCheck">Solo Treni</label>
      <input type="radio" class="btn-check" name="options-base" id="planesCheck" autocomplete="off">
      <label class="btn" for="planesCheck">Solo Aerei</label>
      <input type="radio" class="btn-check" name="options-base" id="bothCheck" autocomplete="off">
      <label class="btn" for="bothCheck">Entrambi</label>
    </div>
    <table id="mainTable" class="table">
      <thead>
        <tr>
          <th scope="col">Citta' di partenza</th>
          <th scope="col">Data & Ora di partenza</th>
          <th scope="col">Citta' di arrivo</th>
          <th scope="col">Data & Ora di arrivo</th>
          <th scope="col">Tipo di viaggio</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Ricordati</th>
          <td>di</td>
          <td>rendere</td>
          <td>la</td>
          <td>tabella</td>
        </tr>
        <tr>
          <th scope="row">dinamica</th>
          <td>in</td>
          <td>base</td>
          <td>ai</td>
          <td>dati</td>
        </tr>
        <tr>
          <th scope="row">ricevuti</th>
          <td>Biggie Cheese</td>
          <td>approva</td>
          <td id="datetry"></td>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
/*
struttura viaggio:
  type
  luogo partenza
  ora partenza
  luogo arrivo
  ora arrivo
*/
function getRndIntegerInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function generateRandomTravels(travelsNumber) { //genera viaggi casuali
  let travels = []; //dichiara array
  for (let i = 0; i < travelsNumber; i++) {
    //dichiarazione tipo (aereo-treno)
    let _type;
    if(getRndIntegerInclusive(0,1) == 0){ _type = 'treno'; } else { _type = 'aereo'; };

    // dichiara data 
    var departureDate = 

    travels[travels.length] = {  }
    
  }
}
</script>
  
<style>
  .vertFlex{ /*ccd sta per centered content div*/ 
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .horzFlex{
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 50%;
  }

  #mainTable{
    width: 50%;
  }
  
  .form-check{
    align-self: flex-end;
  }
  
  .spacer{
    flex-grow: 1;
  }
</style>  