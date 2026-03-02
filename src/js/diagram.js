"use strict";

const url = `https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json`;

let allCourses = [];

let sortedCourses = [];

let sortedCoursesNames = [];

let sortedProgramsNumb = [];

let sortedProgramsNames = [];

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
                //pusha till array som lagrar antal sökande med namn på kurs
                sortedCourses.push({total: course.applicantsTotal, name: course.name});
                // sorterar kurs-antal-arrayen i storleksordning
                sortedCourses.sort((a, b) => a.total - b.total);

                
                
            } else {
                sortedProgramsNumb.push(course.applicantsTotal);
                sortedProgramsNumb.sort((a,b) => a-b);
                
            }

        });

        console.log(sortedCourses);
        
        // reverse array med antal sökande för kurs
        let reversedAplNumbCourses = sortedCourses.reverse();
        // sparar en array med de 6 kurser med flest antal sökande
        let highestAplNumbCourses = [reversedAplNumbCourses[0], reversedAplNumbCourses[1], reversedAplNumbCourses[2], reversedAplNumbCourses[3], reversedAplNumbCourses[4], reversedAplNumbCourses[5]];
        
        // reverse array med antal sökande för program
        let reversedAplNumbPrograms = sortedProgramsNumb.reverse();
        // sparar en array med de 6 program med flest antal sökande
        let highestAplNumbPrograms = [reversedAplNumbPrograms[0], reversedAplNumbPrograms[1], reversedAplNumbPrograms[2], reversedAplNumbPrograms[3], reversedAplNumbPrograms[4], reversedAplNumbPrograms[5]];

        // anropar funktion och skickar med de kurser och program med flest antal sökande
        addChartData(highestAplNumbCourses, highestAplNumbPrograms);

    }
    catch (error) {
        console.error(`Felmeddelande: ${error}`);
    }
}

function addChartData(highestAplNumbCourses, highestAplNumbPrograms) {
    let NumberAplCourses = [];
    let NameCourses = [];

    highestAplNumbCourses.forEach(course=>{
        NumberAplCourses.push(course.total);
        NameCourses.push(course.name);
        
    })
    /* för Chart.js */

    const chartDiv = document.getElementById("myChart");

    new Chart(chartDiv, {
        type: 'bar',
        data: {
            labels: [NameCourses[0], NameCourses[1], NameCourses[2], NameCourses[3], NameCourses[4], NameCourses[5]],
            datasets: [{
                label: '# of Applicants per Course',
                data: [NumberAplCourses[0], NumberAplCourses[1], NumberAplCourses[2], NumberAplCourses[3], NumberAplCourses[4], NumberAplCourses[5]],
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