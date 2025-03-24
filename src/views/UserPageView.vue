<script setup>
    import Ticket from "@/components/Ticket.vue"

    //array di esempio per simulare tempo, da cambiare col db
    let allTickets = [1,2,3,4,5];
    let oldTickets = [];
    let currentTickets = [];

    //timeNow da cambiare dopo db
    let timeNow = 2;

    //tra tutti i biglietti filtra per futuri e passati
    for(let i = 0; i< allTickets.length; i++){
        if(allTickets[i] > timeNow){
            currentTickets.push(allTickets[i])
        }else{
            oldTickets.push(allTickets[i])
        }
    }
</script>

<template>
    <div class="container-fluid">
        <!--Titolo-->
        <div class="w-100 text-center my-2"><h1>Area riservata</h1></div>
        <div class="row">
            <!--Riga 1-->
            <div class="col-6">
                <h3>Viaggi futuri</h3>
            </div>
            <div class="col-6">
                <h3>Cronologia viaggi</h3>
            </div>
            <!--Riga 2-->
            <div class="col-6">
                <Ticket v-for="ct in currentTickets"></Ticket>
            </div>
            <div class="col-6">
                <Ticket v-for="ct in oldTickets"></Ticket>
            </div>
        </div>
        
    </div>
</template>
  
<style>
</style>  