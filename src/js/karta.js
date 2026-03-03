"use strict";


// Deklarerar variabel globalt
let map;
let marker;



document.addEventListener("DOMContentLoaded", async () => {
    
    // sätter ett första deafaultvärde och initialiserar mappen
    map = L.map('mapLeaflet').setView([59.1964289, 17.6271663], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    marker = L.marker([59.1964289, 17.6271663]).addTo(map);

    // lyssna på klick på knapp och läsa sökfras i rutan
    const searchBtn = document.getElementById("searchBtn");
    searchBtn.addEventListener("click", () => {
        const searchBox = document.getElementById("searchBox");


        let searchBoxValue = searchBox.value;
        console.log(searchBoxValue);
        // anropar funktion med sökfrasen som parameter
        loadCordinates(searchBoxValue);


    })

});

// laddar in kordinater med sökfrasen 
async function loadCordinates(city) {

    try {
        // div för felmeddelande
        let felmeddelande = document.getElementById("felmeddelande");
        //ta bort felmeddelande om det finns ett
        if(felmeddelande.innerHTML!=""){
            felmeddelande.innerHTML="";
        }

        // const response = await fetch (`https://maps.googleapis.com/maps/api/geocode/json?address=Stockholm&key=AIzaSyAaiNMOkZvQQJrAexjmX-391lk3doYiLSE`);
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json`);
        const cordinates = await response.json();

        let allCordinates = cordinates;


        let latitude = allCordinates[0].lat;
        let longitude = allCordinates[0].lon;

        console.log(`latitude: ${latitude} longitude: ${longitude}`);

        /* anropar funktion för att ändra karta med longitud, latitud och skickar med 
        map som funktion*/
        setCordinates(longitude, latitude, map, marker);



    }
    catch (error) {
        let felmeddelande = document.getElementById("felmeddelande");
        felmeddelande.innerHTML="<p>Ett problem uppstod vid sökning. Prova igen senare</p>"
        console.error(`Felmeddelande: ${error}`);
    }
}

function setCordinates(longitude, latitude, map) {


    map.setView([latitude, longitude], 13);

    marker = L.marker([latitude, longitude]).addTo(map);


}