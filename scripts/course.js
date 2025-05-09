const courses = [
  {subject:'CSE',number:110,title:'Intro to Programming',credits:2,certificate:'Web and Computer Programming',description:'...',technology:['Python'],completed:true},
  {subject:'WDD',number:130,title:'Web Fundamentals',credits:2,certificate:'Web and Computer Programming',description:'...',technology:['HTML','CSS'],completed:true},
  {subject:'CSE',number:111,title:'Programming with Functions',credits:2,certificate:'Web and Computer Programming',description:'...',technology:['Python'],completed:false},
  {subject:'CSE',number:210,title:'Programming with Classes',credits:2,certificate:'Web and Computer Programming',description:'...',technology:['C#'],completed:false},
  {subject:'WDD',number:131,title:'Dynamic Web Fundamentals',credits:2,certificate:'Web and Computer Programming',description:'...',technology:['HTML','CSS','JavaScript'],completed:true},
  {subject:'WDD',number:231,title:'Frontend Web Dev I',credits:2,certificate:'Web and Computer Programming',description:'...',technology:['HTML','CSS','JavaScript'],completed:false}
];

function renderCourses(filter) {
  const container = document.getElementById("courseCards");
  const filtered = filter ? courses.filter(c => c.subject === filter) : courses;
  container.innerHTML = "";
  let total = 0;
  filtered.forEach(c => {
    const card = document.createElement("div");
    card.className = c.completed ? "card completed" : "card";
    card.innerHTML = `<p>${c.subject} ${c.number} ${c.description}<strong>Credits:</strong> ${c.credits}</p>`;
    let value1 = c.completed;
    if(value1 == true)
    {
    card.style.backgroundColor = 'lightblue';
    }
    else{
      card.style.backgroundColor = 'brown';

    }
    container.appendChild(card);
    total += c.credits;
  });
  document.getElementById("totalCredits").textContent = total;
}
document.getElementById("all").addEventListener("click", () => renderCourses());
document.getElementById("wdd").addEventListener("click", () => renderCourses("WDD"));
document.getElementById("cse").addEventListener("click", () => renderCourses("CSE"));
renderCourses();
