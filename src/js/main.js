"use strict";
/**
 * Ändrar klass på navigeringsmeny vid klick på hamburgersymbol
 */
document.addEventListener("DOMContentLoaded", () => {

    /*Hamburgermeny*/
    const hamburger = document.getElementById("hamburger");

    hamburger.addEventListener("click", () => {

        const nav = document.getElementById("headerNav");

        if (nav.className === "topnav") {
            nav.className += " responsive";
        } else {
            nav.className = "topnav";
        }
        
    });

   

})

