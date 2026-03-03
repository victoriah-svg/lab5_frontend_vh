"use strict";


// karta och markör
let map;
let marker;


/**
 * Initialiserar leafletkarta med position, lägger till en markör och anropar 
 * funktionen loadCordinates med sökfras när denna skrivits in i sökruta och knapp klickats.
 * Körs när DOM-content har laddats in
 */
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

        //lagrar värdet i sökrutan 
        let searchBoxValue = searchBox.value;

        // anropar funktion med sökfrasen som parameter
        loadCordinates(searchBoxValue);


    })

});

/**
 * Hämtar kordinater - longitud och latitud - utifrån namn på plats och anropar och skickar vidare 
 * dessa i anrop till funktionen setCordinates
 * @param {string} searchPhrase - sökfras på plats
 */
async function loadCordinates(searchPhrase) {

    try {
        // div för felmeddelande
        let felmeddelande = document.getElementById("felmeddelande");
        //ta bort felmeddelande om det finns ett
        if (felmeddelande.innerHTML != "") {
            felmeddelande.innerHTML = "";
        }

        
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${searchPhrase}&format=json`);
        const cordinates = await response.json();

        let allCordinates = cordinates;

        // lagrar longitud och latitud
        let latitude = allCordinates[0].lat;
        let longitude = allCordinates[0].lon;


        /* anropar funktion för att ändra karta med longitud, latitud och skickar med 
        map som funktion*/
        setCordinates(longitude, latitude, map);



    }
    catch (error) {
        let felmeddelande = document.getElementById("felmeddelande");
        felmeddelande.innerHTML = "<p>Ett problem uppstod vid sökning. Prova igen senare</p>"
        console.error(`Felmeddelande: ${error}`);
    }
}

/**
 * Tar longitud och latitud och ändrar kordinater i Leafletkarta samt lägger till en markör
 * @param {number} longitude 
 * @param {number} latitude 
 * @param {L.map} map - Leaflet-karta
 */
function setCordinates(longitude, latitude, map) {


    map.setView([latitude, longitude], 13);

    marker = L.marker([latitude, longitude]).addTo(map);


}