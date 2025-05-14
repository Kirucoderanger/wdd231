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




/*
async function getProphetData() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data); // For debugging purposes
        console.table(data.prophets);
    } catch (error) {
        console.error('Error fetching prophet data:', error);
    }
}

getProphetData()
    .then(data => {
        displayProphets(data.prophets);
    })
    .catch(error => {
        console.error('Error processing data:', error);
    });

function displayProphets(data) {
    const prophets = data.prophets;
    prophets.forEach(prophet => {
        const cards = document.querySelector('#cards');
        const card = document.createElement('section');
        
        const h2 = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const image = document.createElement('img');

        h2.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        image.setAttribute('src', prophet.imageurl);
        image.setAttribute('alt', `${prophet.name} ${prophet.lastname} - ${prophet.order}`);
        image.setAttribute('loading', 'lazy');

        card.appendChild(h2);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(image);

        cards.appendChild(card);
    });
}

getProphetData();

function displayProphets(data) {
    const prophets = data.prophets;
    prophets.forEach(prophet => {
        const cards = document.querySelector('#cards');
        const card = document.createElement('section');
        
        const h2 = document.createElement('h2');
        const birthDate = document.createElement('p');
        const birthPlace = document.createElement('p');
        const image = document.createElement('img');

        h2.textContent = `${prophet.name} ${prophet.lastname}`;
        birthDate.textContent = `Date of Birth: ${prophet.birthdate}`;
        birthPlace.textContent = `Place of Birth: ${prophet.birthplace}`;
        image.setAttribute('src', prophet.imageurl);
        image.setAttribute('alt', `${prophet.name} ${prophet.lastname} - ${prophet.order}`);
        image.setAttribute('loading', 'lazy');

        card.appendChild(h2);
        card.appendChild(birthDate);
        card.appendChild(birthPlace);
        card.appendChild(image);

        cards.appendChild(card);
    });
}

displayProphets();*/