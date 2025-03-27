<script setup>
    import Ticket from "@/components/Ticket.vue"
    import { onBeforeMount } from 'vue'
    //array di esempio per simulare tempo, da cambiare col db
    let allTickets = [1,2,3,4,5]; //da togliere dopo onopen funziona
    let oldTickets = [];
    let currentTickets = [];
    let username = "";

    //timeNow da cambiare dopo db
    let timeNow = 2;

    //metodo da fare come costruttore
    onBeforeMount(() => {
        getUserData();
    })



    //fetcha i dati utente
    function getUserData(){
        username = "Biggie Cheese";

        allTickets = [1,2,3,4,5];

        fillTicketsLists();
    }

    //inizializza biglietti filtrati tra viaggi futuri e passati
    function fillTicketsLists(){
        for(let i = 0; i< allTickets.length; i++){
            if(allTickets[i] > timeNow){
                currentTickets.push(allTickets[i])
            }else{
                oldTickets.push(allTickets[i])
            }
        }
    }
</script>

<template>
    <div class="container-fluid">
        <!--Titolo-->
        <div class="w-100 text-center my-2"><h1>Area riservata</h1></div>

        <!--Div informazioni utente-->
        <div class="row">
            <div class="col-6"><h2>Bentornato {{ username }}</h2></div>
        </div>
        <!--Div dei biglietti-->
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