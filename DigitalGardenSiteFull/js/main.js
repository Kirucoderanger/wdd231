import { loadPlants } from './plants.js';
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('menu-toggle').addEventListener('click', () => {
    document.getElementById('nav-links').classList.toggle('active');
  });
  loadPlants();
});
