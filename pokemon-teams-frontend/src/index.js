const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
    fetchTrainers();
})

//<main> in index contains the cards
const main = document.querySelector('#main'); 

// FETCH TRAINER DATA
function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => console.log(json)); 
}    

// CREATE TRAINER CARDS 
function addCard(obj) {
    // <div class="card" data-id="1"><p>Prince</p>
    let div = document.createElement('div');
    div.class = "card";
    div.setAttribute('data-id', `${obj.id}`);

    let p = document.createElement('p');
    p.innerHTML = `${obj.name}`;
    div.append(p);
    
    //<button data-trainer-id="1">Add Pokemon</button>
    let addButton = document.createElement('button');
    addButton.innerText = 'Add Pokemon';
    div.appendChild(addButton);
    
}
