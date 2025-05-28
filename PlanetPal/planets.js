document.addEventListener('DOMContentLoaded', async () => { 
    const container = document.getElementById('planetCards'); 
    const modal = document.getElementById('planetModal'); 
    const modalContent = document.getElementById('modalContent'); 
    try { const res = await fetch('data/planets.json'); 
        const planets = await res.json(); planets.forEach((planet) => { 
            const card = document.createElement('div'); card.classList.add('card'); 
            card.innerHTML = `<img src='${planet.image}' alt='${planet.name}' loading='lazy' /><h2>${planet.name}</h2><p>Type: ${planet.type}</p><p>Orbit Period: ${planet.orbit}</p><button>More Info</button>`; 
            card.querySelector('button').addEventListener('click', () => { 
                modalContent.innerHTML = `<h2>${planet.name}</h2><p><strong>Type:</strong> ${planet.type}</p><p><strong>Orbit:</strong> ${planet.orbit}</p><img src='${planet.image}' alt='${planet.name}' />`; 
                modal.showModal(); }); container.appendChild(card); }); } catch (err) { 
                    container.innerHTML = '<p>Failed to load planet data.</p>'; 
                } 
            document.getElementById('closeModal').addEventListener('click', () => modal.close()); 
            document.addEventListener('click', (event) => { 
                if (event.target === modal) { modal.close(); } 
            }
        );
            });