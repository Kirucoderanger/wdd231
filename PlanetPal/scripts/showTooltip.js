
  export function showTooltip(url, target, planet) {
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
const tooltip = document.getElementById('tooltip');
const tooltipImg = document.getElementById('tooltipImg');
const tooltipDesc = document.getElementById('tooltipDesc');
const tooltipName = document.getElementById('tooltipName');
const tooltipLink = document.getElementById('tooltipLink');
  
