

import { getExoplanets } from "./getExoplanets.js";


const tooltip = document.getElementById('tooltip');
const tooltipImg = document.getElementById('tooltipImg');
const tooltipDesc = document.getElementById('tooltipDesc');
const tooltipName = document.getElementById('tooltipName');

const tooltipLink = document.getElementById('tooltipLink');





export function previewPlanets(dataPlanets) {

  let filteredPlanets = [];
  let chunkSize = 100;
  let currentChunk = 0;
  let totalChunks = 0;
  let currentMode = 'sequential';

  //const planetContainer = document.getElementById("planetContainer");

  function shuffleArray(arr) {
    const array = [...arr];
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

 

  //initial display
  filteredPlanets = dataPlanets;
  
  updateView();



  function getChunk(data, index) {
    const start = index * chunkSize;
    return data.slice(start, start + chunkSize);
  }

  function updateView() {
    let data = [...filteredPlanets];
    if (currentMode === 'random') data = shuffleArray(data);
    const chunk = getChunk(data, currentChunk);
    getExoplanets(chunk);
      document.getElementById("pageInfo1").textContent = `Page ${currentChunk + 1} of ${totalChunks}`;
    
  }

  document.getElementById("filterForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this);
    
    const selectedHostnames = formData.getAll("disc_telescope").map(h => h.trim());

    const selectedMethods = formData.getAll("discoverymethod");
    const selectedYears = formData.getAll("disc_year").map(Number);
    currentMode = formData.get("mode");

    filteredPlanets = dataPlanets.filter(p => {
      // Filter by hostname, discovery method, and year
      const matchHostname = selectedHostnames.length ? selectedHostnames.includes(p.disc_telescope) : true;
      const matchMethod = selectedMethods.length ? selectedMethods.includes(p.discoverymethod) : true;
      const matchYear = selectedYears.length ? selectedYears.includes(p.disc_year) : true;
      return matchHostname && matchMethod && matchYear;
    });

    //currentChunk = 0;
    totalChunks = Math.ceil(filteredPlanets.length / chunkSize);
    updateView();
  });

  document.getElementById("nextBtn1").addEventListener("click", () => {
    if (currentChunk < totalChunks - 1) {
      currentChunk++;
      updateView();
    }
  });

  document.getElementById("prevBtn1").addEventListener("click", () => {
    if (currentChunk > 0) {
      currentChunk--;
      updateView();
    }
  });


  // Initial display
  //updateView();


}









  

