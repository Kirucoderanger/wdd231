import {previewPlanets} from "./previewPlanets.js";
import { createFilterTree } from "./createFilterTree.js";
import { restoreFilters, saveFilters, clearFilters } from "./filterStorage.js";

const API_KEY = 'hB5ME60Ovw64Ey9FLdbxIC5dxlP79aZesIgvRQjN'; 
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=Cumulative&where=koi_disposition%20like%20%27CONFIRMED%27&format=json&limit=100&offset=0&api_key=" + API_KEY;
//const EXO_URL = "https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=select+pl_name,hostname,sy_snum,sy_snum,sy_pnum,sy_mnum,pl_refname,discoverymethod,disc_year,disc_telescope,pl_orbper,pl_orbsmax,pl_rade,pl_radj,pl_masse,pl_massj,pl_dens,pl_orbeccen,pl_eqt,st_refname,pl_orbincl,pl_rvamp,st_rad,st_mass,sy_dist,st_age,rowupdate+from+ps&format=json";
//const EXO_URL = "../data/exoplanetsnasapstable.json";
const EXO_URL = "data/exo5.json";
const K_EXO_URL = "../data/exo3.json";



document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});
// Create filter tree
createFilterTree();

async function fetchExoplanets() {
 
  try {
    const response = await fetch(EXO_URL, { mode: 'cors' });
    if (!response.ok) {
      console.error('HTTP error:', response.status);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const dataCount = data.length;
    //console.log(`Fetched ${dataCount} exoplanets from ${EXO_URL}`);
    //console.log('Exoplanets fetched:', data);
     const seen = new Set();
    const uniquePlanets = data.filter(p => {
      if (seen.has(p.pl_name)) return false;
      seen.add(p.pl_name);
      return true;
    });
    const dataCountDis = uniquePlanets.length;
    //console.log(`Fetched ${dataCountDis} exoplanets from ${EXO_URL}`);
    //console.log('Exoplanets fetched:', uniquePlanets);

    //previewPlanets(uniquePlanets);
    //console.log(uniquePlanets);
    //return uniquePlanets;
    
previewPlanets(uniquePlanets);
       
  } catch (error) {
    
    console.error('Exoplanet fetch failed:', error);

  }
}



fetchExoplanets();


const filterForm = document.getElementById('filterForm');
const filterTree = document.getElementById('filterTree');
/*filterTree.addEventListener('change', (e) => {
  if (e.target.tagName === 'INPUT' && e.target.type === 'checkbox') {
    saveFilters();
  }
});*/

//filterTree.addEventListener('change', saveFilters);
filterForm.addEventListener('change', saveFilters);
filterForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form reload
  saveFilters();
  //createFilterTree(); // your actual filter function
});


window.addEventListener('DOMContentLoaded', () => {
  restoreFilters();
});

document.getElementById('clearFiltersBtn').addEventListener('click', clearFilters);


