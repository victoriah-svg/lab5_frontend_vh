"use strict";

const url = `https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json`;

document.addEventListener("DOMContentLoaded", async () => {
    loadCourses();
});

async function loadCourses() {
    

    try {
        const response = await fetch(url);
        const courses = await response.json();
        // lagrar alla kurser i global array
       let allCourses = courses;
       allCourses.forEach(course => {
        console.log(course.name, course.applicantsTotal);
       });
        

    }
    catch (error) {
        console.error(`Felmeddelande: ${error}`);
    }
}

/* för Chart.js */

const chartDiv = document.getElementById("myChart");

new Chart(chartDiv, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    }, 
    options: {
        backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
    }
});

const chartDiv2 = document.getElementById("myChart2");

new Chart(chartDiv2, {
    type: 'pie',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
        }]
    }, 
    options: {
        backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
    }
});