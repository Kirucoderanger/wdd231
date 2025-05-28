export async function loadPlants() {
  try {
    const res = await fetch('./data/plants.json');
    const plants = await res.json();
    const container = document.getElementById('plants');
    plants.forEach(plant => {
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h3>${plant.name}</h3>
        <p><strong>Type:</strong> ${plant.type}</p>
        <p><strong>Origin:</strong> ${plant.origin}</p>
        <p><strong>Use:</strong> ${plant.use}</p>
      `;
      container.appendChild(div);
    });
  } catch (error) {
    console.error("Failed to load plant data:", error);
  }
}

