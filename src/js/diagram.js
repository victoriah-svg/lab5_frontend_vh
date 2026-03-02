"use strict";

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