"use strict";

const url = `https://mallarmiun.github.io/Frontend-baserad-webbutveckling/Moment%205%20-%20Dynamiska%20webbplatser/statistik_sokande_ht25.json`;

let allCourses = [];

let sortedCourses = [];

let sortedPrograms = [];


/**
 * Anropar funktion loadCourses när DOM-content har laddats in
 */
document.addEventListener("DOMContentLoaded", async () => {
    loadCourses();


});

/**
 * Hämtar kurser och program från Mittuniversitetet och returnerar 2 arrayer
 *  - en med ansökningstotal och namn på de 6 mest sökta kurserna och en med ansökningstotal och namn på de 6 mest sökta programmen. 
 *  Dessa skickas vidare till addChartData
 */
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
                sortedPrograms.push({total: course.applicantsTotal, name: course.name});
                sortedPrograms.sort((a,b) => a.total - b.total);
                
            }

        });

        
        
        // reverse array med antal sökande för kurs
        let reversedAplNumbCourses = sortedCourses.reverse();
        // sparar en array med de 6 kurser med flest antal sökande
        let highestAplNumbCourses = [reversedAplNumbCourses[0], reversedAplNumbCourses[1], reversedAplNumbCourses[2], reversedAplNumbCourses[3], reversedAplNumbCourses[4], reversedAplNumbCourses[5]];
        
        // reverse array med antal sökande för program
        let reversedAplNumbPrograms = sortedPrograms.reverse();
        // sparar en array med de 6 program med flest antal sökande
        let highestAplNumbPrograms = [reversedAplNumbPrograms[0], reversedAplNumbPrograms[1], reversedAplNumbPrograms[2], reversedAplNumbPrograms[3], reversedAplNumbPrograms[4], reversedAplNumbPrograms[5]];

        // anropar funktion och skickar med de kurser och program med flest antal sökande
        addChartData(highestAplNumbCourses, highestAplNumbPrograms);

    }
    catch (error) {
        console.error(`Felmeddelande: ${error}`);
    }
}
/**
 * Lägger till Antal sökande och namn på de populäraste kurserna och programmen på Mittuniversitetet i två diagram
 * @param {object[]} highestAplNumbCourses - kurser
 * @param {object[]} highestAplNumbPrograms - program
 * @param {number} highestAplNumbCourses.total - totalt nummer ansökningar kurs
 * @param {string} highestAplNumbCourses.name - kursnamn
 * @param {number} highestAplNumbPrograms.total - totalt nummer ansökningar program
 * @param {string} highestAplNumbPrograms.name - programnamn
 */
function addChartData(highestAplNumbCourses, highestAplNumbPrograms) {
    //Arrayer för antal sökande kurser och namn kurser
    let NumberAplCourses = [];
    let NameCourses = [];

    //Arrayer för antal sökande program och namn program
    let NumberAplPrograms = [];
    let NamePrograms = [];

    // Filtrerar kurser och skickar antal och namn till varsin array 
    highestAplNumbCourses.forEach(course=>{
        NumberAplCourses.push(course.total);
        NameCourses.push(course.name);
        
    })

    // Filtrerar program och skickar antal och namn till varsin array
    highestAplNumbPrograms.forEach(program => {
        NumberAplPrograms.push(program.total);
        NamePrograms.push(program.name);
    })


    /* för Chart.js */

    const chartDiv = document.getElementById("myChart");
    //Stapeldiagram med kurser
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
            backgroundColor: ["#85b6c0", "#456853", "#223a3e", "#835faa", "Purple", "Orange"],
            scales: {
            x: {
                ticks: {
                    minRotation: 45,
                    maxRotation: 45
                }
            },
            y: {
                beginAtZero: true
            }
        }
        }
        
    });

    const chartDiv2 = document.getElementById("myChart2");
    // Cirkeldiagram med program
    new Chart(chartDiv2, {
        type: 'pie',
        data: {
            labels: [NamePrograms[0], NamePrograms[1], NamePrograms[2], NamePrograms[3], NamePrograms[4]],
            datasets: [{
                label: '# of Votes',
                data: [NumberAplPrograms[0], NumberAplPrograms[1], NumberAplPrograms[2], NumberAplPrograms[3], NumberAplPrograms[4]],
                borderWidth: 1
            }]
        },
        options: {
            backgroundColor: ["#456848", "#dc7b0d", "#700cd4", "#57bfd4", "Purple", "Orange"]
        }
    });
}