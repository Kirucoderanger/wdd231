const ImageUrl = "data/exoplanetimgurl.json";

export async function fetchPlanetImage(planetName, urlIndex, Planet, randomUrlIndex) {
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
