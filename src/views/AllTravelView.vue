<script setup>
import { onMounted, onBeforeMount } from 'vue'
let travels = [];
const cityList = ['Cervia', 'Cesena', 'Santa Maria Nuova Spallicci di Bertinoro Centro', 'Crocevia Ciarpame', 'Napoli', 'Massachussets Institute of Technology', 'Nessus'];
  // document.getElementById('datetry').innerHTML = Date.now.toLocaleString()
onBeforeMount(() => {
  console.log('onmounted');
  for (let i = 0; i < 5; i++) {
    console.log('loop');
    //dichiarazione tipo (aereo-treno)
    let _type;
    if(getRndIntegerInclusive(0,1) == 0){ _type = 'Treno'; } else { _type = 'Aereo'; };

    // dichiara data 
    var _departureDate = new Date();
    _departureDate.setDate(_departureDate.getDate() + 1)
    console.log(_departureDate)

    var _arrivalDate = _departureDate;
    _arrivalDate.setHours(_arrivalDate.getHours() + 1)
    console.log(_arrivalDate)

    var _departureCity = cityList[getRndIntegerInclusive(0, cityList.length - 1)]
    console.log(_departureCity)

    var _arrivalCity = cityList[getRndIntegerInclusive(0, cityList.length - 1)]
    console.log(_arrivalCity)

    travels[i] = { 
      type: _type,
      departureDate: _departureDate,
      departureCity: _departureCity,
      arrivalDate: _arrivalDate,
      arrivalCity: _arrivalCity
     }

     console.log(travels[i])
  }
})


</script>

<template>
  <div class="vertFlex">
    <div style="width: 50%;" class="input-group my-4">
      <span class="input-group-text">Arrivi e partenze da:</span>
      <input type="text" class="form-control" placeholder="Napoli" aria-label="Città di partenza" aria-describedby="startCity">
      <button class="btn btn-outline-secondary">Invio</button>
    </div>
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
        <tr v-for="(item, index) in travels" :key="index">
          <td>{{ item.departureCity }}</td>
          <td>{{ item.departureDate }}</td>
          <td>{{ item.arrivalCity }}</td>
          <td>{{ item.arrivalDate }}</td>
          <td>{{ item.type }}</td>
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