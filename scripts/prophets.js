const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';
//const cards = document.querySelector('#cards');
async function getProphetData() {
  const response = await fetch(url);
  const data = await response.json();
  //console.table(data.prophets); // temporary testing of data response
   displayProphets(data.prophets); // note that you reference the prophets array of the JSON data object, not just the object
}

const displayProphets = (prophets) => {
  // card build code goes here
    prophets.forEach((prophet) => {
        const cards = document.querySelector('#cards');
        const card = document.createElement('section');
    
        const fullName = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const portrait = document.createElement('img');
    
        fullName.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${prophet.order}`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
    
        card.appendChild(fullName);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(portrait);
    
        cards.appendChild(card);
    });
}


getProphetData();



