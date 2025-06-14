//const API_KEY = 'nxdJuJQTpNgm2sFQHRvhCUNAeleOomZGD61hqQRH'; // Replace with your NASA API key
const API_KEY = 'hB5ME60Ovw64Ey9FLdbxIC5dxlP79aZesIgvRQjN'; // Replace with your NASA API key
//const API_URL = `https://api.le-systeme-solaire.net/rest/bodies/?isPlanet=true&isPlanetaryMoon=false&isDwarfPlanet=false&isStar=false&isAsteroid=false&isComet=false&isSatellite=false&isExoplanet=false&isExoplanetCandidate=false&isExoplanetConfirmed=false&isExoplanetCandidateConfirmed=false`;
//const API_URL2 = `https://api.le-systeme-solaire.net/rest/bodies/?isPlanet=true&isPlanetaryMoon=false&isDwarfPlanet=false&isStar=false&isAsteroid=false&isComet=false&isSatellite=false&isExoplanet=true&isExoplanetCandidate=false&isExoplanetConfirmed=false&isExoplanetCandidateConfirmed=false`;
//const EXO_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,disc_year,pl_bmassj,pl_radj+from+ps+order+by+disc_year+desc+limit+10&format=json';
//const url = `https://api.nasa.gov/exoplanetarchive/data?api_key=${apiKey}&format=json&table=exoplanets&select=pl_name,pl_orbper,pl_rade,pl_eqt&where=pl_rade>1`;
//const EXO_URL = `https://api.nasa.gov/exoplanetarchive/data?api_key=${API_KEY}&format=json&table=exoplanets&select=pl_name,pl_orbper,pl_rade,pl_eqt&where=pl_rade>1&order=pl_orbper&limit=100&offset=0`;

//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_disposition%20like%20%27CANDIDATE%27&where=koi_period%3E300,koi_prad%3C2&order=koi_period&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_disposition%20like%20%27CANDIDATE%27&where=koi_period%3E300,koi_prad%3C2&order=koi_period&format=json&limit=100&offset=0" ;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year+from+ps&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year+from+ps&format=json&limit=100&offset=0&api_key=${API_KEY}`;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year+from+ps&format=json&limit=100&offset=0";
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,ra,dec+from+ps+where+upper(soltype)+like+'%25CONF%25'+and+pl_masse+between+0.5+and+2.0&format=json&limit=100&offset=0&api_key=" + API_KEY;

//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=k2names&format=json&where=pl_kepflag=1&order=pl_name&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_kepflag=1&order=pl_name&limit=100&offset=0";
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=Cumulative&format=json&limit=100&offset=0&api_key=" + API_KEY;
const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=Cumulative&where=koi_disposition%20like%20%27CONFIRMED%27&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = "../data/exoplanets.json"; 
//const EXO_URL = "../data/exoplanets1.json";
const ImageUrl = "../data/exoplanetimgurl.json";
// Local JSON file for testing


document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

const tooltip = document.getElementById('tooltip');
const tooltipImg = document.getElementById('tooltipImg');
const tooltipDesc = document.getElementById('tooltipDesc');
const tooltipName = document.getElementById('tooltipName');

const tooltipLink = document.getElementById('tooltipLink');

let hideTimeout = null;

async function getExoplanets() {
  try {
    // Fetch exoplanets data from the NASA Exoplanet Archive
    //const response = await fetch(EXO_URL, { mode: 'cors' });
    // Use 'no-cors' mode for cross-origin requests if necessary, but be aware it limits the response type
    // Note: 'no-cors' mode will not allow you to read the response body, so you may need to handle CORS differently
    //const response = await fetch(EXO_URL, { mode: 'no-cors' });
    // Note: 'no-cors' mode will not allow you to read the response body, so you may need to handle CORS differently
    //const response = await fetch(EXO_URL, { mode: 'cors' });
    const response = await fetch(EXO_URL, { mode: 'cors' });
    const limitedResponse = await response.clone().json();
    if (Array.isArray(limitedResponse) && limitedResponse.length > 100) {
      limitedResponse.length = 100;
    }
    const data = limitedResponse;
    
    if (!response.ok) {
      console.error('HTTP error:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    //const data = await response.json();
    console.log('Exoplanets fetched:', data);
    /*if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const planetContainer = document.getElementById('planetContainer');
    planetContainer.innerHTML = ''; // Clear previous content
    if (data.length === 0) {
      planetContainer.innerHTML = '<p>No exoplanets found.</p>';
      return;
    }
    // Render each planet card
    document.getElementById('planetCount').textContent = `Found ${data.length} exoplanets`;
    document.getElementById('planetContainer').innerHTML = ''; // Clear previous content
    document.getElementById('planetContainer').classList.add('grid'); // Add grid class for styling*/

    let urlIndex = 0;
    data.forEach((planet) => {
      
      const { kepoi_name, kepler_name, disc_year, pl_bmassj, pl_radj } = planet;
      renderPlanetCard(kepoi_name, kepler_name, disc_year, pl_bmassj, pl_radj, planet);
      fetchPlanetImage(kepler_name, urlIndex, planet);
      
      urlIndex = urlIndex + 1;
      console.log(urlIndex);
    });
  } catch (error) {
    console.error('Exoplanet fetch failed:', error);
  }
}

function renderPlanetCard(name, kname, year, mass, radius, planet) {
  const container = document.getElementById('planetContainer');
  const card = document.createElement('div');
  card.className = 'planet-card';
  card.dataset.planet = kname;
  card.innerHTML = `
    <img class="planet-img" src="" alt="Planet Image" />
    <h3>${name}/${kname}</h3>
    
  `;

  //<p>Discovered: ${year}</p>
    //<p>Mass (Jupiter): ${mass}</p>
    //<p>Radius (Jupiter): ${radius}</p>

    card.addEventListener('mouseenter', (e) => {
      //const url = "https://cdn.pixabay.com/photo/2023/03/14/12/06/exoplanet-7852200_1280.jpg";
      const img = card.querySelector('img');
      const url = img.src;
      clearTimeout(hideTimeout);
      showTooltip(e, kname, name, url, card);
    });

    card.addEventListener('mouseleave', () => {
      // Delay hiding to check if entering tooltip
      hideTimeout = setTimeout(() => {
        if (!tooltip.matches(':hover')) {
          tooltip.style.display = 'none';
        }
      }, 100);
    });

  container.appendChild(card);
}



tooltip.addEventListener('mouseenter', () => {
    clearTimeout(hideTimeout);
  });

  tooltip.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
  });

  function showTooltip(event, planet, name, url, target) {
    tooltip.style.display = 'block';
    tooltipImg.src = url;
    tooltipDesc.textContent = name;
    tooltipName.textContent = planet;
    tooltipLink.href = planet;

    const rect = target.getBoundingClientRect();
    const tooltipWidth = 500;
    const tooltipHeight = 500;

    tooltip.classList.remove('top', 'left', 'right','bottom');
    

   let top = rect.top - tooltipHeight - 16;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    let position = 'top';

    if (top < 0) {
      if (rect.left + tooltipWidth + 30 < window.innerWidth) {
        position = 'right';
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + 10;
      } else {
        position = 'left';
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - 10;
      }
    }

    if (left < 0) left = 10;
    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - 10;
    }

    tooltip.classList.add(position);
    tooltip.style.top = `${top + window.scrollY}px`;
    tooltip.style.left = `${left + window.scrollX}px`;
    //tooltip.style.opacity = '1';


    /*let top, left, position;
const padding = 10;

// Default to top
top = rect.top - tooltipHeight - padding;
left = rect.left + rect.width / 2 - tooltipWidth / 2;
position = 'top';

// Check if there's not enough space above
if (top < window.scrollY) {
  // Try bottom
  if (rect.bottom + tooltipHeight + padding < window.innerHeight + window.scrollY) {
    position = 'bottom';
    top = rect.bottom + padding;
    left = rect.left + rect.width / 2 - tooltipWidth / 2;
  }
  // Try right
  else if (rect.right + tooltipWidth + padding < window.innerWidth + window.scrollX) {
    position = 'right';
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    left = rect.right + padding;
  }
  // Fallback to left
  else {
    position = 'left';
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    left = rect.left - tooltipWidth - padding;
  }
}

// Ensure tooltip doesn't overflow horizontally
if (left < window.scrollX) left = window.scrollX + padding;
if (left + tooltipWidth > window.innerWidth + window.scrollX) {
  left = window.innerWidth + window.scrollX - tooltipWidth - padding;
}

// Ensure tooltip doesn't overflow vertically
if (top < window.scrollY) top = window.scrollY + padding;
if (top + tooltipHeight > window.innerHeight + window.scrollY) {
  top = window.innerHeight + window.scrollY - tooltipHeight - padding;
}

// Apply position and coordinates
tooltip.classList.add(position);
tooltip.style.top = `${top}px`;
tooltip.style.left = `${left}px`;
tooltip.style.opacity = '1';*/

/*
let top, left, position;
const padding = 10;

top = rect.top - tooltipHeight - padding;
left = rect.left + rect.width / 2 - tooltipWidth / 2;
position = 'top';

if (top < window.scrollY) {
  if (rect.bottom + tooltipHeight + padding < window.innerHeight + window.scrollY) {
    position = 'bottom';
    top = rect.bottom + padding;
    left = rect.left + rect.width / 2 - tooltipWidth / 2;
  } else if (rect.right + tooltipWidth + padding < window.innerWidth + window.scrollX) {
    position = 'right';
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    left = rect.right + padding;
  } else {
    position = 'left';
    top = rect.top + rect.height / 2 - tooltipHeight / 2;
    left = rect.left - tooltipWidth - padding;
  }
}

if (left < window.scrollX) left = window.scrollX + padding;
if (left + tooltipWidth > window.innerWidth + window.scrollX) {
  left = window.innerWidth + window.scrollX - tooltipWidth - padding;
}
if (top < window.scrollY) top = window.scrollY + padding;
if (top + tooltipHeight > window.innerHeight + window.scrollY) {
  top = window.innerHeight + window.scrollY - tooltipHeight - padding;
}

tooltip.className = `tooltip ${position}`;
tooltip.style.top = `${top}px`;
tooltip.style.left = `${left}px`;
tooltip.style.opacity = '1';*/

    
  }

  //tooltip.classList.add('show');
  //tooltip.classList.remove('show');




  /* 
  tooltip.classList.remove('top', 'left', 'right', 'bottom');

    let top = rect.top - tooltipHeight - 16;
    let left = rect.left + rect.width / 2 - tooltipWidth / 2;
    let position = 'top';

    // If tooltip overflows above, try below
    if (top < window.scrollY) {
      top = rect.bottom + 16;
      position = 'bottom';
    }

    // If tooltip overflows below, try right or left
    if (top + tooltipHeight > window.innerHeight + window.scrollY) {
      if (rect.right + tooltipWidth + 10 < window.innerWidth) {
        position = 'right';
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.right + 10;
      } else if (rect.left - tooltipWidth - 10 > 0) {
        position = 'left';
        top = rect.top + rect.height / 2 - tooltipHeight / 2;
        left = rect.left - tooltipWidth - 10;
      } else {
        // fallback to top
        position = 'top';
        top = rect.top - tooltipHeight - 16;
        left = rect.left + rect.width / 2 - tooltipWidth / 2;
      }
    }

    // Clamp left/right to viewport
    if (left < 10) left = 10;
    if (left + tooltipWidth > window.innerWidth) {
      left = window.innerWidth - tooltipWidth - 10;
    }

    // Clamp top/bottom to viewport
    if (top < window.scrollY + 10) top = window.scrollY + 10;
    if (top + tooltipHeight > window.innerHeight + window.scrollY) {
      top = window.innerHeight + window.scrollY - tooltipHeight - 10;
    }

    tooltip.classList.add(position);
    tooltip.style.top = `${top}px`;
    tooltip.style.left = `${left}px`;
  
  */







async function fetchPlanetImage(planetName, urlIndex, Planet) {

  const res = await fetch(ImageUrl);
  const data = await res.json();
  console.log(planetName);
  console.log(urlIndex);
  //console.log(data);
  console.log(data[urlIndex].url);
  const imageItem = data[urlIndex].url;
  const imgUrl = imageItem;
      const imgElem = document.querySelector(`[data-planet="${planetName}"] .planet-img`);
      if (imgElem){
        imgElem.src = imgUrl;
        tooltipImg.src = imgUrl;
      } 
  


  /*const jsonString = '[{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]';
  const jsonArray = JSON.parse(jsonString);

  console.log(jsonArray[0]); // Output: { name: 'John', age: 30 }
  console.log(jsonArray[1].name); // Output: Jane

  const jsonString2 = '{"users": [{"name": "John", "age": 30}, {"name": "Jane", "age": 25}]}';
  const jsonObject = JSON.parse(jsonString2);

  console.log(jsonObject.users[0].name); // Output: John*/


  /*try {
    const res = await fetch(ImageUrl.url[urlIndex]);
    const data = await res.json();
    console.log(data);
    const jsonArray = JSON.parse(data);

    if (!res.ok) {
      console.error('HTTP error:', res.status);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    
    console.log(urlIndex);

    const imageItem = jsonArray[urlIndex].url;

    console.log('Exoplanets image url fetched:', imageItem);
    if (imageItem) {
      const imgUrl = imageItem.links[0].href;
      const imgElem = document.querySelector(`[data-planet="${planetName}"] .planet-img`);
      if (imgElem) imgElem.src = imgUrl;
    }
  } catch (err) {
    console.warn(`no image  for ${planetName}`, err);
  }*/
  
}

/*async function fetchPlanetImage(planetName) {
  //console.log(`Fetching image for ${planetName}`);
  // Use the NASA Images API to search for images related to the planet
  // Note: The NASA Images API may not have images for all exoplanets, so handle cases where no image is found
  
  // Construct the search URL for the NASA Images API
  const searchUrl = `https://images-api.nasa.gov/search?q=${encodeURIComponent(planetName)}&media_type=image`;
  
  try {
    const res = await fetch(searchUrl);
    const data = await res.json();
    const imageItem = data.collection.items[0];
    if (imageItem) {
      const imgUrl = imageItem.links[0].href;
      const imgElem = document.querySelector(`[data-planet="${planetName}"] .planet-img`);
      if (imgElem) imgElem.src = imgUrl;
    }
  } catch (err) {
    console.warn(`No image for ${planetName}`, err);
  }
}*/

  

getExoplanets();
/*
Kirubel Me
Looking to test your new credentials right away?
Checkout demo.astronomyapi.com
Application Id
d3678aac-be5e-4d5d-a17f-9bb563a23e2b
Application Secret
85cb1916516a8dcfbb99fc7b9fa29107b67f92f58f37bde6a1cfe1ea21171bf08fe6e63045e1415bf5f4982e035415e1bc1ce4c839c481f3598aee4a7b5f4d229026d894728b4aeb7959c5186e5047dfea85f2a9e1a4d559322c01099d73dffbf7fd3e0edc507b7d3cc468738d03d4a9
Please note down these credentials somewhere safe, because there's no way to retrieve them after you navigate away.
*/