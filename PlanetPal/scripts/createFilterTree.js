import { filterOptions } from "../data/filterOption.mjs";

export function createFilterTree() {

      const checkBoxContainer = document.getElementById('filterTree');
      filterOptions.forEach((group, index) => {
        const groupContainer = document.createElement('div');
        groupContainer.className = 'parent-container';

      // Toggle Button
      const toggleButton = document.createElement('span');
      toggleButton.className = 'toggle-button';
      toggleButton.textContent = '+';

      // Parent Checkbox
      const parentLabel = document.createElement('label');
      const parentCheckbox = document.createElement('input');
      parentCheckbox.type = 'checkbox';
      parentCheckbox.className = 'parent-checkbox';
      parentLabel.appendChild(parentCheckbox);
      parentLabel.append(` ${group.label}`);

      // Children Container
      const childrenDiv = document.createElement('div');
      childrenDiv.className = 'children';

      group.children.forEach(childName => {
        const childLabel = document.createElement('label');
        const childCheckbox = document.createElement('input');
        childCheckbox.type = 'checkbox';
        childCheckbox.className = 'child-checkbox';
        childCheckbox.name = group.label;
        childCheckbox.value = childName;
        childCheckbox.dataset.group = index;
        childLabel.appendChild(childCheckbox);
        childLabel.append(` ${childName}`);
        childrenDiv.appendChild(childLabel);
        childrenDiv.appendChild(document.createElement('br'));
      });

      // Append elements
      groupContainer.appendChild(toggleButton);
      groupContainer.appendChild(parentLabel);
      groupContainer.appendChild(childrenDiv);
      checkBoxContainer.appendChild(groupContainer);

      // Toggle handler
      toggleButton.addEventListener('click', () => {
        childrenDiv.classList.toggle('visible');
        toggleButton.textContent = childrenDiv.classList.contains('visible') ? '−' : '+';
      });

      // Select/Deselect all children
      parentCheckbox.addEventListener('change', () => {
        const childBoxes = childrenDiv.querySelectorAll('.child-checkbox');
        childBoxes.forEach(box => box.checked = parentCheckbox.checked);
      });

      // If all children are checked, parent becomes checked too
      const childBoxes = childrenDiv.querySelectorAll('.child-checkbox');
      childBoxes.forEach(box => {
        box.addEventListener('change', () => {
          const allChecked = [...childBoxes].every(c => c.checked);
          parentCheckbox.checked = allChecked;
        });
      });
    });
    
}