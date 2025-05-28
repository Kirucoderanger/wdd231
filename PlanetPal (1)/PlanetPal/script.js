//const API_KEY = 'nxdJuJQTpNgm2sFQHRvhCUNAeleOomZGD61hqQRH'; // Replace with your NASA API key
const API_KEY = 'hB5ME60Ovw64Ey9FLdbxIC5dxlP79aZesIgvRQjN'; // Replace with your NASA API key
//const API_URL = `https://api.le-systeme-solaire.net/rest/bodies/?isPlanet=true&isPlanetaryMoon=false&isDwarfPlanet=false&isStar=false&isAsteroid=false&isComet=false&isSatellite=false&isExoplanet=false&isExoplanetCandidate=false&isExoplanetConfirmed=false&isExoplanetCandidateConfirmed=false`;
//const API_URL2 = `https://api.le-systeme-solaire.net/rest/bodies/?isPlanet=true&isPlanetaryMoon=false&isDwarfPlanet=false&isStar=false&isAsteroid=false&isComet=false&isSatellite=false&isExoplanet=true&isExoplanetCandidate=false&isExoplanetConfirmed=false&isExoplanetCandidateConfirmed=false`;
//const EXO_URL = 'https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,disc_year,pl_bmassj,pl_radj+from+ps+order+by+disc_year+desc+limit+10&format=json';
//const url = `https://api.nasa.gov/exoplanetarchive/data?api_key=${apiKey}&format=json&table=exoplanets&select=pl_name,pl_orbper,pl_rade,pl_eqt&where=pl_rade>1`;
//const EXO_URL = `https://api.nasa.gov/exoplanetarchive/data?api_key=${API_KEY}&format=json&table=exoplanets&select=pl_name,pl_orbper,pl_rade,pl_eqt&where=pl_rade>1&order=pl_orbper&limit=100&offset=0`;

//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=k2names&where=koi_disposition%20like%20%27CANDIDATE%27&where=koi_period%3E300,koi_prad%3C2&order=koi_period&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=cumulative&where=koi_disposition%20like%20%27CANDIDATE%27&where=koi_period%3E300,koi_prad%3C2&order=koi_period&format=json&limit=100&offset=0" ;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year+from+ps&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year+from+ps&format=json&limit=100&offset=0&api_key=${API_KEY}`;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,discoverymethod,disc_year+from+ps&format=json&limit=100&offset=0";
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,pl_masse,ra,dec+from+ps+where+upper(soltype)+like+'%25CONF%25'+and+pl_masse+between+0.5+and+2.0&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=k2names&format=json&where=pl_kepflag=1&order=pl_name&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?&table=exoplanets&format=ipac&where=pl_kepflag=1&order=pl_name&limit=100&offset=0";
const EXO_URL = "../data/exoplanets.json"; 
// Local JSON file for testing


document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

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

    data.forEach((planet) => {
      const { pl_name, disc_year, pl_bmassj, pl_radj } = planet;
      renderPlanetCard(pl_name, disc_year, pl_bmassj, pl_radj);
      fetchPlanetImage(pl_name);
    });
  } catch (error) {
    console.error('Exoplanet fetch failed:', error);
  }
}

function renderPlanetCard(name, year, mass, radius) {
  const container = document.getElementById('planetContainer');
  const card = document.createElement('div');
  card.className = 'planet-card';
  card.dataset.planet = name;
  card.innerHTML = `
    <img class="planet-img" src="" alt="Planet Image" />
    <h3>${name}</h3>
    <p>Discovered: ${year}</p>
    <p>Mass (Jupiter): ${mass}</p>
    <p>Radius (Jupiter): ${radius}</p>
  `;
  container.appendChild(card);
}

async function fetchPlanetImage(planetName) {
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
}

  

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