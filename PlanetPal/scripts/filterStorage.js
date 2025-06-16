import { createFilterTree } from "./createFilterTree.js";
const filterForm = document.getElementById('filterForm');
const filterTree = document.getElementById('filterTree');

filterForm.addEventListener('change', saveFilters);
filterForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form reload
  saveFilters();
  //createFilterTree(); // your actual filter function
});

export function saveFilters() {
  const mode = filterForm.querySelector('input[name="mode"]:checked')?.value;
  
  // Collect checkbox filters if any
  const filters = {};
   const checkboxes = filterForm.querySelectorAll('#filterTree input[type="checkbox"]');

  //const checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
    filters[cb.name] = cb.checked;
  });

  const data = {
    mode,
    filters
  };

  localStorage.setItem('planetpalFilters', JSON.stringify(data));
}



window.addEventListener('DOMContentLoaded', () => {
  restoreFilters();
});

export function restoreFilters() {
  const saved = localStorage.getItem('planetpalFilters');
  if (!saved) return;

  const { mode, filters } = JSON.parse(saved);

  if (mode) {
    const radio = filterForm.querySelector(`input[name="mode"][value="${mode}"]`);
    if (radio) radio.checked = true;
  }

  if (filters) {
    const checkboxes = filterForm.querySelectorAll('#filterTree input[type="checkbox"]');
    checkboxes.forEach(cb => {
      if (filters.hasOwnProperty(cb.name)) {
        cb.checked = filters[cb.name];
      }
    });
  }
}


export function clearFilters() {
  localStorage.removeItem('planetpalFilters');
  filterForm.reset();
}
