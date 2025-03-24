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
      <th scope="col">#</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Handle</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
  </div>
</template>
  
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