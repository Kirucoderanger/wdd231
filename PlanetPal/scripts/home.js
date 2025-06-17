import { parameter } from "../data/exoplanetProperties.mjs";
import { discoveryMethod } from "../data/exoplanetProperties.mjs";

document.getElementById('menuToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('show');
});

//console.log(parameter);

 const data = [
    { title: "Planet A", description: "Planet A is a gas giant with several moons." },
    { title: "Planet B", description: "Planet B has a thick atmosphere and strong winds." },
    { title: "Planet C", description: "Planet C might be habitable with water traces." }
  ];

  const ul = document.getElementById('itemList');
  const modal = document.getElementById('detailModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalDescription = document.getElementById('modalDescription');
  const closeModal = document.getElementById('closeModal');

  function showModal(item) {
    modalTitle.textContent = item.property;
    modalDescription.textContent = item.description;
    modal.classList.remove('hidden');
  }

  function renderList(items) {
    ul.innerHTML = ""; // Clear previous content
    items.forEach(item => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span>${item.property}</span>
        <button class="detail-btn" title="Click to view details">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm0 64a48 48 0 110 96 48 48 0 010-96zm56 280c0 4.4-3.6 8-8 8h-96c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h16v-88h-16c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h64c4.4 0 8 3.6 8 8v112h16c4.4 0 8 3.6 8 8v16z"/>
            </svg>
            Detail
          </button>
      `;

      li.querySelector('.detail-btn').addEventListener('click', () => {
        showModal(item);
      });

      ul.appendChild(li);
    });
  }

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  // Render the initial list
  renderList(parameter);






   const learnBtn = document.querySelector(".learn-btn");
    const methodList = document.getElementById("methodList");
    const tooltip = document.getElementById("tooltip");

    let activeIndex = -1;
    let hideTimeout;

     function populateList() {
      methodList.innerHTML = "";
      discoveryMethod.forEach((method, index) => {
        const item = document.createElement("div");
        item.className = "method-item";

        const label = document.createElement("span");
        label.textContent = method.property;

        const icon = document.createElement("span");
        icon.innerHTML = "ℹ️";
        icon.className = "info-icon";

        icon.addEventListener("mouseenter", (e) => {
          clearTimeout(hideTimeout);
          if (window.innerWidth > 768) showTooltip(e, method, index);
        });

        icon.addEventListener("mouseleave", () => {
          if (window.innerWidth > 768) delayedHideTooltip();
        });

        icon.addEventListener("click", (e) => {
          e.stopPropagation();
          if (window.innerWidth <= 768) {
            if (activeIndex === index) {
              hideTooltip();
              activeIndex = -1;
            } else {
              showTooltip(e, method, index);
              activeIndex = index;
            }
          }
        });

        item.appendChild(label);
        item.appendChild(icon);
        methodList.appendChild(item);
      });

      document.body.addEventListener("click", () => {
        hideTooltip();
        activeIndex = -1;
      });
    }

    function showTooltip(event, method, index) {
      const formatted = method.description.replace(/\n/g, "<br><br>");
      tooltip.innerHTML = `
        <div class="text">${formatted}</div>
        <div class="actions">
          <button onclick="copyText(\`${method.description.replace(/`/g, "\\`")}\`)">Copy</button>
          ${method.link ? `<a href="${method.link}" target="_blank">Learn more ↗</a>` : ''}
        </div>
      `;
      tooltip.classList.add("visible");

      const item = event.target.closest(".method-item");
      const itemRect = item.getBoundingClientRect();
      const listRect = methodList.getBoundingClientRect();

      const pointerOffset = itemRect.top - listRect.top + itemRect.height / 2;

      // Align tooltip vertically with method list
      const tooltipTop = listRect.top + window.scrollY;
      tooltip.style.top = `${tooltipTop - 100}px`;
      tooltip.style.left = `${listRect.right + 10}px`;
      tooltip.style.height = `${listRect.height}px`;

      const arrow = tooltip.querySelector("::before");
      tooltip.style.setProperty("--pointer-top", `${pointerOffset}px`);
      tooltip.querySelector("::before");

      tooltip.style.setProperty("--pointer-top", `${pointerOffset}px`);
      tooltip.style.setProperty("--list-top", `${tooltipTop}px`);
      tooltip.style.setProperty("--list-height", `${listRect.height}px`);

      // Reposition the arrow
      tooltip.style.setProperty("--arrow-top", `${pointerOffset}px`);
      tooltip.querySelector("::before").style.top = `${pointerOffset - 6}px`;
    }

    function hideTooltip() {
      tooltip.classList.remove("visible");
    }

    function delayedHideTooltip() {
      hideTimeout = setTimeout(() => {
        hideTooltip();
      }, 600);
    }

    function copyText(text) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Description copied to clipboard!");
      });
    }

    learnBtn.addEventListener("click", () => {
      const isShowing = methodList.classList.contains("show");
      methodList.classList.toggle("show", !isShowing);
      methodList.style.display = "block";
      if (!isShowing) {
        populateList();
      } else {
        hideTooltip();
      }
    });

