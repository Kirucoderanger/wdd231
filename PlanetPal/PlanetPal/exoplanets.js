import { filterOptions } from "../data/filterOption.mjs";
const API_KEY = 'hB5ME60Ovw64Ey9FLdbxIC5dxlP79aZesIgvRQjN'; 
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=Cumulative&where=koi_disposition%20like%20%27CONFIRMED%27&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,sy_snum,sy_snum,sy_pnum,sy_mnum,pl_refname,discoverymethod,disc_year,disc_telescope,pl_orbper,pl_orbsmax,pl_rade,pl_radj,pl_masse,pl_massj,pl_dens,pl_orbeccen,pl_eqt,st_refname,pl_orbincl,pl_rvamp,st_rad,st_mass,sy_dist,st_age,rowupdate+from+ps&format=json";
//const EXO_URL = "../data/exoplanetsnasapstable.json";
const EXO_URL = "../data/exo5.json";
const K_EXO_URL = "../data/exo3.json";
const ImageUrl = "../data/exoplanetimgurl.json";


document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});



const checkBoxContainer = document.getElementById('filterTree');

    

    filterOptions.forEach((group, index) => {
      const groupContainer = document.createElement('div');
      groupContainer.className = 'parent-container';

      // Toggle Button
      const toggleButton = document.createElement('span');
      toggleButton.className = 'toggle-button';
      toggleButton.textContent = '+';

      // Parent Checkbox
      const parentLabel = document.createElement('label');
      const parentCheckbox = document.createElement('input');
      parentCheckbox.type = 'checkbox';
      parentCheckbox.className = 'parent-checkbox';
      parentLabel.appendChild(parentCheckbox);
      parentLabel.append(` ${group.label}`);

      // Children Container
      const childrenDiv = document.createElement('div');
      childrenDiv.className = 'children';

      group.children.forEach(childName => {
        const childLabel = document.createElement('label');
        const childCheckbox = document.createElement('input');
        childCheckbox.type = 'checkbox';
        childCheckbox.className = 'child-checkbox';
        childCheckbox.name = group.label;
        childCheckbox.value = childName;
        childCheckbox.dataset.group = index;
        childLabel.appendChild(childCheckbox);
        childLabel.append(` ${childName}`);
        childrenDiv.appendChild(childLabel);
        childrenDiv.appendChild(document.createElement('br'));
      });

      // Append elements
      groupContainer.appendChild(toggleButton);
      groupContainer.appendChild(parentLabel);
      groupContainer.appendChild(childrenDiv);
      checkBoxContainer.appendChild(groupContainer);

      // Toggle handler
      toggleButton.addEventListener('click', () => {
        childrenDiv.classList.toggle('visible');
        toggleButton.textContent = childrenDiv.classList.contains('visible') ? '−' : '+';
      });

      // Select/Deselect all children
      parentCheckbox.addEventListener('change', () => {
        const childBoxes = childrenDiv.querySelectorAll('.child-checkbox');
        childBoxes.forEach(box => box.checked = parentCheckbox.checked);
      });

      // If all children are checked, parent becomes checked too
      const childBoxes = childrenDiv.querySelectorAll('.child-checkbox');
      childBoxes.forEach(box => {
        box.addEventListener('change', () => {
          const allChecked = [...childBoxes].every(c => c.checked);
          parentCheckbox.checked = allChecked;
        });
      });
    });





const tooltip = document.getElementById('tooltip');
const tooltipImg = document.getElementById('tooltipImg');
const tooltipDesc = document.getElementById('tooltipDesc');
const tooltipName = document.getElementById('tooltipName');

const tooltipLink = document.getElementById('tooltipLink');
const container = document.getElementById('planetContainer');
const pageInfo = document.getElementById('pageInfo');
const prevBtn = document.getElementById('prevPage');
const nextBtn = document.getElementById('nextPage');


let hideTimeout = null;
async function fetchExoplanets() {
 
  try {
    const response = await fetch(EXO_URL, { mode: 'cors' });
    if (!response.ok) {
      console.error('HTTP error:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const dataCount = data.length;
    console.log(`Fetched ${dataCount} exoplanets from ${EXO_URL}`);
    console.log('Exoplanets fetched:', data);
     const seen = new Set();
    const uniquePlanets = data.filter(p => {
      if (seen.has(p.pl_name)) return false;
      seen.add(p.pl_name);
      return true;
    });
    const dataCountDis = uniquePlanets.length;
    console.log(`Fetched ${dataCountDis} exoplanets from ${EXO_URL}`);
    console.log('Exoplanets fetched:', uniquePlanets);
    
    //previewPlanets(uniquePlanets);
    console.log(uniquePlanets);
    //return uniquePlanets;
    
previewPlanets(uniquePlanets);
       
  } catch (error) {
    
    console.error('Exoplanet fetch failed:', error);

  }

  


}

function previewPlanets(dataPlanets) {

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

  /*function renderPlanets(planets) {
    planetContainer.innerHTML = "";
    planets.forEach(planet => {
      const card = document.createElement("div");
      card.className = "planet-card";
      card.innerHTML = `<h4>${planet.pl_name}</h4><p>${planet.hostname}</p><p>${planet.discoverymethod} - ${planet.disc_year}</p>`;
      planetContainer.appendChild(card);
    });
    document.getElementById("pageInfo").textContent = `Page ${currentChunk + 1} of ${totalChunks}`;
  }*/

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

fetchExoplanets();

function getExoplanets(chunked, currentChunk, totalChunks) {
  //document.getElementById("pageInfo1").textContent = `Page ${currentChunk + 1} of ${totalChunks}`;
  
  
    /*const response = await fetch(EXO_URL, { mode: 'cors' });
    const limitedResponse = await response.clone().json();
 
    try {

    if (Array.isArray(limitedResponse) && limitedResponse.length > 100) {
      limitedResponse.length = 100;
    }
    const data = limitedResponse;
    
    if (!response.ok) {
      console.error('HTTP error:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log('Exoplanets fetched:', data);
    const limitedRes = limitedResponse;

    


  } catch (error) {
    console.error('Exoplanet fetch failed:', error);
  }

  
function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}*/

const limitedResponse = chunked;
const cardsPerPage = 20;
let currentPage = 1;
let allPlanets = limitedResponse.slice();

//getExoplanets();
  //const limitedResponse = getExoplanets();

  const searchBar = document.getElementById('searchBar');
  searchBar.addEventListener('input', () => {
    const q = searchBar.value.toLowerCase();
    allPlanets = limitedResponse.filter(p => p.pl_name.toLowerCase().includes(q) || p.hostname.toLowerCase().includes(q)  || p.discoverymethod.toLowerCase().includes(q));
    currentPage = 1;
    showPage();
  });

   /* document.getElementById("searchBar").addEventListener("input", function () {
    const serchVal = document.getElementById("searchBar").value;
      const query = this.value.toLowerCase();
      const allPlanets = limitedResponse.filter(planet =>
        planet.pl_name.toLowerCase().includes(query) 
        //planet.hostname.toLowerCase().includes(query) ||
        //planet.discoverymethod.toLowerCase().includes(query) ||
        //planet.disc_year.toLowerCase().includes(query)
      );
  

      //renderCards(filtered);
      currentPage = 1;
       showPage();
      
       
      //showTooltip(url, card, filtered);
      console.log(`Exoplanets filtered ${serchVal}:`,filtered);
}); */


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
 //container.innerHTML = "";
 //clearContainer(container);
 //Array.from(container.children).forEach(child => container.removeChild(child));
 //container.replaceChildren();
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
    <img class="planet-img" src="" alt="Planet Image" />
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

//getExoplanets();



  function showTooltip(url, target, planet) {
    const planetNameUrl = planet.pl_name.replace(/ /g,"%20");
    
    //const planetNameReplace = planetName.replaceAll(" ","%20");//not supported in older environments.
    const overviewHerf = `https://exoplanetarchive.ipac.caltech.edu/overview/${planetNameUrl}#overview`;
    tooltip.style.display = 'block';
    tooltipImg.src = url;
    tooltipDesc.textContent = `Planet name: ${planet.pl_name}`;
    tooltipName.textContent = `Hosting Star: ${planet.hostname}`;
    tooltipLink.href = overviewHerf;
  const rect = target.getBoundingClientRect();
  const tooltipWidth = 250;
  const tooltipHeight = 350;

  tooltip.classList.remove('top', 'bottom', 'left', 'right');

  const space = {
    top: rect.top,
    bottom: window.innerHeight - rect.bottom,
    left: rect.left,
    right: window.innerWidth - rect.right
  };

  let top = 0;
  let left = 0;
  let position = '';

  // Prefer bottom if close to top of screen
  if (space.bottom >= tooltipHeight + 10) {
    position = 'bottom';
    top = rect.bottom + 10;
    left = rect.left + rect.width / 2 - tooltipWidth / 2;
  } else if (space.top >= tooltipHeight + 10) {
    position = 'top';
    top = rect.top - tooltipHeight - 10;
    left = rect.left + rect.width / 2 - tooltipWidth / 2;
  } else if (space.right >= tooltipWidth + 10) {
    position = 'right';
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    left = rect.right + 10;
  } else if (space.left >= tooltipWidth + 10) {
    position = 'left';
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    left = rect.left - tooltipWidth - 10;
  } else {
    // Fallback to bottom if nothing fits
    position = 'bottom';
    top = rect.bottom + 10;
    left = rect.left + rect.width / 2 - tooltipWidth / 2;
  }

  // Clamp to viewport
  top = Math.max(10, Math.min(top + window.scrollY, window.scrollY + window.innerHeight - tooltipHeight - 10));
  left = Math.max(10, Math.min(left + window.scrollX, window.scrollX + window.innerWidth - tooltipWidth - 10));

  tooltip.classList.add(position);
  tooltip.style.top = `${top}px`;
  tooltip.style.left = `${left}px`;


const toggleBtn = tooltip.querySelector(".toggle-btn");
const dropdown = tooltip.querySelector(".dropdown");
const moreBtn = tooltip.querySelector(".more-btn");
const moreInfo = tooltip.querySelector(".more-info");

let isOpen = false;
let isMoreOpen = false;

toggleBtn.addEventListener("click", () => {

  
  

  dropdown.innerHTML = `<ul class = "flex-list">
              <li>Number of Moons: ${planet.sy_mnum}</li>
              <li>Orbital Period: ${Math.round(planet.pl_orbper * 10 ** 2) / 10 ** 2}/days</li>
              <li>Discoverymethod: ${planet.discoverymethod}</li>
              <li>Discoverd: ${planet.disc_year}</li>
              <li>${planet.disc_telescope}</li>
              <li>Orbit Semi-Major Axis: ${planet.pl_orbsmax}</li>
              <li>Radius: ${Math.round(planet.pl_rade * 10 ** 2) / 10 ** 2}/Earth</li>
              <li>Radius: ${Math.round(planet.pl_radj * 10 ** 2) / 10 ** 2}/Jupiter</li>
              <li>Mass: ${Math.round(planet.pl_masse * 10 ** 2) / 10 ** 2}/Earth</li>
              <li>Mass: ${Math.round(planet.pl_massj * 10 ** 2) / 10 ** 2}/Jupiter</li>
              <li>Density: ${planet.pl_dens}/g/cm**3</li>
              <li>Eccentricity: ${planet.pl_orbeccen}</li>
              <li>Temperature: ${planet.pl_eqt}/K</li>
              <li>Inclination: ${planet.pl_orbincl}/deg</li>
              <li>Radial Velocity: ${planet.pl_rvamp}/m/s</li>
              <li>Stellar Radius: ${planet.st_rad}/Solar</li>
              <li>Stellar Mass: ${planet.st_mass}/Solar</li>
              <li>Distance: ${planet.sy_dist}/PC</li>
              <li>Stellar Age: ${planet.st_age}/Gyr</li>
              <li>Last Updated: ${planet.rowupdate}</li>
              
            </ul>
            <div class="more-btn">More Info ▼</div>
            <div class="more-info">
              <p>Planetary Parameter Reference: ${planet.pl_refname}</p>
              <p>Stellar Parameter Reference: ${planet.st_refname}</p>
            </div>`;

            const moreBtn = tooltip.querySelector(".more-btn");
const moreInfo = tooltip.querySelector(".more-info");
  
          isOpen = !isOpen;

          if (isOpen) {
            toggleBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                <path d="M231 256l107-107c9.4-9.4 9.4-24.6 0-33.9l-22.6-22.6c-9.4-9.4-24.6-9.4-33.9 0L174.4 199.4 67.3 92.3c-9.4-9.4-24.6-9.4-33.9 0L10.7 114.9c-9.4 9.4-9.4 24.6 0 33.9l107 107-107 107c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l107-107 107 107c9.4 9.4 24.6 9.4 33.9 0l22.6-22.6c9.4-9.4 9.4-24.6 0-33.9L231 256z"/>
              </svg>`;
            toggleBtn.title = "Close details";
            dropdown.classList.add("open");
          } else {
            toggleBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 64a48 48 0 110 96 48 48 0 010-96zm56 280c0 4.4-3.6 8-8 8h-96c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h16v-88h-16c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v112h16c4.4 0 8 3.6 8 8v16z"/>
              </svg>
              Detail`;
            toggleBtn.title = "Click to view details";
            dropdown.classList.remove("open");
            moreInfo.classList.remove("open");
            moreBtn.textContent = "More Info ▼";
            isMoreOpen = false;
          }

           moreBtn.addEventListener("click", () => {
          isMoreOpen = !isMoreOpen;
          moreInfo.classList.toggle("open");
          moreBtn.textContent = isMoreOpen ? "Less Info ▲" : "More Info ▼";
        });
        });

        



tooltip.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    toggleBtn.innerHTML = `
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 64a48 48 0 110 96 48 48 0 010-96zm56 280c0 4.4-3.6 8-8 8h-96c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h16v-88h-16c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v112h16c4.4 0 8 3.6 8 8v16z"/>
              </svg>
              Detail`;
            toggleBtn.title = "Click to view details";
            dropdown.classList.remove("open");
            moreInfo.classList.remove("open");
            moreBtn.textContent = "More Info ▼";
            isMoreOpen = false;
    
  });
    
  }

  

async function fetchPlanetImage(planetName, urlIndex, Planet, randomUrlIndex) {
  try {
    const res = await fetch(ImageUrl);
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
    const data = await res.json();
    //const randomUrlIndex = data[Math.floor(Math.random() * data.length)];
    const imageItem = data[randomUrlIndex]?.url;
    const imgUrl = imageItem || '';
    const imgElem = document.querySelector(`[data-planet="${planetName}"] .planet-img`);
    if (imgElem && imgUrl) {
      imgElem.src = imgUrl;
      tooltipImg.src = imgUrl;
    }
  } catch (error) {
    console.error('Failed to fetch planet image:', error);
  }
} 

/*
const randomGroup = filterOptions[Math.floor(Math.random() * filterOptions.length)];
    console.log('Randomly selected group:', randomGroup);

    function getRandomItem(arr) {
    const index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

const getRandomItem = arr => arr[Math.floor(Math.random() * arr.length)];*/