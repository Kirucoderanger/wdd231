import { fetchPlanetImage } from "./fetchPlanetImage.js";
import {showTooltip} from "./showTooltip.js"

let hideTimeout = null;

const pageInfo = document.getElementById('pageInfo');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');

export function getExoplanets(chunked) {
  

const limitedResponse = chunked;
const cardsPerPage = 20;
let currentPage = 1;
let allPlanets = limitedResponse.slice();



  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', () => {
    const q = searchBar.value.toLowerCase();
    allPlanets = limitedResponse.filter(p => p.pl_name.toLowerCase().includes(q) || p.hostname.toLowerCase().includes(q)  || p.discoverymethod.toLowerCase().includes(q));
    currentPage = 1;
    showPage();
  });

  


function paginate(arr, page, perPage) {
    const start = (page - 1) * perPage;
    return arr.slice(start, start + perPage);
  }


  function updatePaginationButtons() {
    const totalPages = Math.ceil(allPlanets.length / cardsPerPage);
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage >= totalPages;
  }


  function showPage() {
    const pageData = paginate(allPlanets, currentPage, cardsPerPage);
    renderCards(pageData);
    updatePaginationButtons();
  }


   prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage--;
      showPage();
    }
  });
  nextBtn.addEventListener('click', () => {
    const totalPages = Math.ceil(allPlanets.length / cardsPerPage);
    if (currentPage < totalPages) {
      currentPage++;
      showPage();
    }
  });

  // Initial display
  showPage();

  
  


function renderCards(filteredPlanets) {
  const container = document.getElementById('planetContainer');
 
 document.querySelectorAll('.planet-card').forEach(card => card.remove());

    let urlIndex = 0;
    filteredPlanets.forEach((planet) => {
      
      const { pl_name } = planet;
      renderPlanetCard(planet);

      const randomUrlIndex = Math.floor(Math.random() * filteredPlanets.length);
      //const randomIndex = Math.floor(Math.random() * myArray.length);
      fetchPlanetImage(pl_name, urlIndex, planet, randomUrlIndex);
      
      
      urlIndex = urlIndex + 1;
      //console.log(urlIndex);
    });
    
  }

   
   //renderCards(limitedResponse);
   //getExoplanets().then(renderCards).catch(err => console.error("Error:", err));

   
    

function renderPlanetCard(planet) {
  const container = document.getElementById('planetContainer');
  const card = document.createElement('div');
  card.className = 'planet-card';
  card.dataset.planet = planet.pl_name;
  card.innerHTML = `
    <img class="planet-img" src="" alt="Planet Image" loading="lazy"/>
    <h3>${planet.pl_name}/${planet.hostname}</h3>
    
  `;

card.addEventListener('mouseenter', () => {
      //const url = "https://cdn.pixabay.com/photo/2023/03/14/12/06/exoplanet-7852200_1280.jpg";
      const img = card.querySelector('img');
      const url = img.src;
      clearTimeout(hideTimeout);
      showTooltip(url, card, planet);
    });

    

    card.addEventListener('mouseleave', () => {
      // Delay hiding to check if entering tooltip
      hideTimeout = setTimeout(() => {
        if (!tooltip.matches(':hover')) {
          tooltip.style.display = 'none';
        }
      }, 150);
    });

    tooltip.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });
   

  container.appendChild(card);


 
}


 
}
