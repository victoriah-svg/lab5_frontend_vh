"use strict";

const url = `https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json`;

let allCourses = [];

let sortedCoursesNumb = [];

let sortedProgramsNumb = [];

document.addEventListener("DOMContentLoaded", async () => {
    loadCourses();


});

async function loadCourses() {


    try {
        const response = await fetch(url);
        const courses = await response.json();
        // lagrar alla kurser i global array
        allCourses = courses;
        allCourses.forEach(course => {
            if (course.type === "Kurs") {
                sortedCoursesNumb.push(course.applicantsTotal);
                sortedCoursesNumb.sort((a, b) => a - b);
                
            } else {
                sortedProgramsNumb.push(course.applicantsTotal);
                sortedProgramsNumb.sort((a,b) => a-b);
                
            }

        });
        
        // reverse array med antal sökande för kurs
        let reversedAplNumbCourses = sortedCoursesNumb.reverse();
        // sparar en array med de 6 kurser med flest antal sökande
        let highestAplNumbCourses = [reversedAplNumbCourses[0], reversedAplNumbCourses[1], reversedAplNumbCourses[2], reversedAplNumbCourses[3], reversedAplNumbCourses[4], reversedAplNumbCourses[5]];
        
        let reversedAplNumbPrograms = sortedProgramsNumb.reverse();

        let highestAplNumbPrograms = [reversedAplNumbPrograms[0], reversedAplNumbPrograms[1], reversedAplNumbPrograms[2], reversedAplNumbPrograms[3], reversedAplNumbPrograms[4], reversedAplNumbPrograms[5]];

        // anropar funktion och skickar med de kurser och program med flest antal sökande
        addChartData(highestAplNumbCourses, highestAplNumbPrograms);

    }
    catch (error) {
        console.error(`Felmeddelande: ${error}`);
    }
}

function addChartData(highestAplNumbCourses, highestAplNumbPrograms) {
    /* för Chart.js */

    const chartDiv = document.getElementById("myChart");

    new Chart(chartDiv, {
        type: 'bar',
        data: {
            labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
            datasets: [{
                label: '# of Votes',
                data: [highestAplNumbCourses[0], highestAplNumbCourses[1], highestAplNumbCourses[2], highestAplNumbCourses[3], highestAplNumbCourses[4]],
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
                data: [highestAplNumbPrograms[0], highestAplNumbPrograms[1], highestAplNumbPrograms[2], highestAplNumbPrograms[3], highestAplNumbPrograms[4]],
                borderWidth: 1
            }]
        },
        options: {
            backgroundColor: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"]
        }
    });
}