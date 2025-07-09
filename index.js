const todos = document.getElementById('getAll');
const main = document.querySelector('.main');
const name = document.getElementById('name');
const estadoTxt = document.getElementById('estado');
const humanord = document.getElementById("humano");
const alienrd = document.getElementById("alien");


todos.addEventListener('click', getAll); 
name.addEventListener('keyup',()=>{
   fetchPersonajes().then(data => {
      main.innerHTML = ""; 
      data.forEach(personaje => {
        var nombre = personaje.name;
        if(nombre.toLowerCase().indexOf(name.value.toLowerCase()) !== -1){
            Card(personaje);
        }     
      });
   });
  limpiard();  
});
name.addEventListener('blur',()=>{
  name.value = '';
})

estadoTxt.addEventListener('change', ()=>{
     fetchPersonajes().then(data => {
      main.innerHTML = ""; 
      data.forEach(personaje => {
        var estado = personaje.status;
        if(estado.toLowerCase().indexOf(estadoTxt.value.toLowerCase()) !== -1){
            Card(personaje);
        }   
      });
   });
  limpiard();  
});
estadoTxt.addEventListener('blur',()=>{
  estadoTxt.value =' -- Estado --'
})

humanord.addEventListener('change', () => {
  if (humanord.checked) {
    fetchPersonajes().then(data => {
      main.innerHTML = "";
      data.forEach(personaje => {
        const species = personaje.species.toLowerCase();
        if (species.includes(humanord.value.toLowerCase())) {
          Card(personaje);
        }
      });
    });
  } else {
    main.innerHTML = ""; 
  }
});

alienrd.addEventListener('change', () => {
  if (alienrd.checked) {
    fetchPersonajes().then(data => {
      main.innerHTML = "";
      data.forEach(personaje => {
        const species = personaje.species.toLowerCase();
        if (species.includes(alienrd.value.toLowerCase())) {
          Card(personaje);
        }
      });
    });
  } else {
    main.innerHTML = "";
  }
});





function Card(personaje)
{
   const card = document.createElement("div");
      card.classList.add("card");
      card.innerHTML = `
      <h2>${personaje.name}</h2>
      <img src="${personaje.image}"">
      <p>Estado: ${personaje.status}</p>
      <p>Especie: ${personaje.species}</p>
      `;
      main.appendChild(card);
}


function getAll() {
  fetchPersonajes().then(data => {
    main.innerHTML = "";
    data.forEach(personaje => {
      Card(personaje);
    });
  });
  limpiard();  
}


function fetchPersonajes() {
  return fetch('https://rickandmortyapi.com/api/character')
    .then(response => response.json())
    .then(data => data.results)
    .catch(error => {
      console.error('Error:', error);
      return []; 
    });
}


function limpiard() {
  const especieRadios = document.getElementsByName("especie");
  especieRadios.forEach(radio => {
    radio.checked = false;
  });
}
