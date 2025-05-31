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

const getString = window.location.search;
console.log(getString);

const registrationInfo = new URLSearchParams(getString);
console.log(registrationInfo);
console.log(registrationInfo.get("firstName"));
console.log(registrationInfo.get("lastName"));
console.log(registrationInfo.get("orgTitle"));
console.log(registrationInfo.get("email"));
console.log(registrationInfo.get("phone"));
console.log(registrationInfo.get("organization"));
console.log(registrationInfo.get("membership"));
console.log(registrationInfo.get("orgDescription"));
console.log(registrationInfo.get("timestamp"));

document.querySelector("#results").innerHTML = `
<p>Organization Representative: ${registrationInfo.get("firstName")} ${registrationInfo.get("lastName")}</p>
<p>Organization Title: ${registrationInfo.get("orgTitle")} </p>
<p>Organization Type: ${registrationInfo.get("organization")}</p>
<p>Membership Level: ${registrationInfo.get("membership")}</p>
<p>Organization Phone: ${registrationInfo.get("phone")} </p>
<p>Organization email is: ${registrationInfo.get("email")}</p>
<p>Organization Description: ${registrationInfo.get("orgDescription")}</p> 
<p>Time of registration: ${registrationInfo.get("timestamp")}</p>   
`;

document.querySelector("#thanks").innerHTML = `<h2>Thank you for Registering with Us</h2>`;

