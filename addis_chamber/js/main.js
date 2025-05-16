
async function loadMembers() {
  const response = await fetch('data/members.json');
  const data = await response.json();
  const container = document.getElementById('members');
  container.innerHTML = '';

  data.forEach(member => {
    const card = document.createElement('div');
    card.innerHTML = `
      <h3>${member.name}</h3>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">${member.website}</a>
    `;
    container.appendChild(card);
  });
}

document.getElementById("grid").addEventListener("click", () => {
  document.getElementById("members").className = "grid-view";
});
document.getElementById("list").addEventListener("click", () => {
  document.getElementById("members").className = "list-view";
});

document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

loadMembers();
