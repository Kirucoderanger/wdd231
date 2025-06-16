import { createFilterTree } from "./createFilterTree.js";
const filterForm = document.getElementById('filterForm');
const filterTree = document.getElementById('filterTree');

filterForm.addEventListener('change', saveFilters);
filterForm.addEventListener('submit', (e) => {
  e.preventDefault(); // prevent form reload
  saveFilters();
  //createFilterTree(); // actual filter function
});

export function saveFilters() {
  const mode = filterForm.querySelector('input[name="mode"]:checked')?.value;
  
  // Collect checkbox filters if any
  const filters = {};
   const checkboxes = filterForm.querySelectorAll('#filterTree input[type="checkbox"]');

  //const checkboxes = filterForm.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(cb => {
  if (!cb.checked) return; // Skip unchecked boxes
  // If the checkbox is checked, add it to the filters object
  if (!filters.hasOwnProperty(cb.name)) {
    filters[cb.name] = {};
  }
  filters[cb.name][cb.value] = cb.checked;
  if (cb.dataset.group) {
    filters[cb.name].group = cb.dataset.group; // Store group index if available  
  }
  if (cb.dataset.label) {
    filters[cb.name].label = cb.dataset.label; // Store label if available
  }

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
      // If the checkbox is in the saved filters, set its checked state
      if (!filters.hasOwnProperty(cb.name)) return; // Skip unchecked boxes
      if (filters[cb.name].hasOwnProperty(cb.value)) {
        cb.checked = filters[cb.name][cb.value];
      }
      // If the checkbox has a group or label, set those attributes
      if (cb.dataset.group && filters[cb.name].group !== undefined) {
        cb.dataset.group = filters[cb.name].group;
      }
      if (cb.dataset.label && filters[cb.name].label !== undefined) {
        cb.dataset.label = filters[cb.name].label;
      }
      
    });
  }
}


export function clearFilters() {
  localStorage.removeItem('planetpalFilters');
  filterForm.reset();
}
