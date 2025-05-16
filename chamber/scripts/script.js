// script.js
const menuItem = document.querySelector("#menu");
const navElement = document.querySelector("#animated-menu");

// Toggle navigation menu on mobile
menuItem.addEventListener("click", () => {
    //navElement.classList.toggle("responsive");
    navElement.classList.toggle("open");
    menuItem.classList.toggle("open");

});
// Close navigation menu when a link is clicked
/*const navLinks = document.querySelectorAll(".navigation a");
navLinks.forEach(link => {  
    link.addEventListener("click", () => {
        navElement.classList.remove("responsive");
    });
});
// Update the year and last modified date
const yearSpan = document.querySelector("#year");
const lastModifiedSpan = document.querySelector("#lastModified");
yearSpan.textContent = new Date().getFullYear();
lastModifiedSpan.textContent = document.lastModified;
// Toggle between grid and list view for members    
const gridBtn = document.querySelector("#grid-view");
const listBtn = document.querySelector("#list-view");
const membersContainer = document.querySelector("#members-container");
gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
});
listBtn.addEventListener("click", () => {   
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
});
*/
document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  const membersContainer = document.getElementById("members-container");
  const gridBtn = document.getElementById("grid-view");
  const listBtn = document.getElementById("list-view");

  // Update year and last modified
  yearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = document.lastModified;

  // Toggle view
  gridBtn.addEventListener("click", () => {
    membersContainer.classList.add("grid-view");
    membersContainer.classList.remove("list-view");
  });

  listBtn.addEventListener("click", () => {
    membersContainer.classList.add("list-view");
    membersContainer.classList.remove("grid-view");
  });

  // Load members from JSON
  async function loadMembers() {
    try {
      const response = await fetch("scripts/members.json");
      const members = await response.json();

      membersContainer.innerHTML = members.map(member => `
        <div class="member-card level-${member.membership}">
          <img src="images/${member.image}" alt="${member.name} logo" />
          <h3>${member.name}</h3>
          <p>${member.description}</p>
          <p><strong>Address:</strong> ${member.address}</p>
          <p><strong>Phone:</strong> ${member.phone}</p>
          <a href="${member.website}" target="_blank">Visit Website</a>
        </div>
      `).join("");
    } catch (error) {
      membersContainer.innerHTML = "<p>Failed to load members.</p>";
      console.error("Error loading members:", error);
    }
  }

  loadMembers();
});
// Responsive design for mobile
