const menuItem = document.querySelector("#menu");
const navElement = document.querySelector("#animated-menu");

// Toggle navigation menu on mobile
menuItem.addEventListener("click", () => {
    //navElement.classList.toggle("responsive");
    navElement.classList.toggle("open");
    menuItem.classList.toggle("open");

});

document.addEventListener("DOMContentLoaded", () => {
  const yearSpan = document.getElementById("year");
  const lastModifiedSpan = document.getElementById("lastModified");
  
  // Update year and last modified
  yearSpan.textContent = new Date().getFullYear();
  lastModifiedSpan.textContent = document.lastModified;
});

function openModal(id) {
      document.getElementById(id).style.display = 'flex';
    }
    function closeModal(e) {
      if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
      }
    }
    
    // Auto fill timestamp on load
    document.getElementById("timestamp").value = new Date().toISOString();
    //const timeStamp = new Date().toISOString();
    //document.getElementById("timestamp").value = timeStamp;