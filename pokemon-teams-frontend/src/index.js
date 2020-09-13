const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", ()=> {
  fetchTrainers()
})

let main = document.querySelector("main") 

function fetchTrainers(){
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => createCard(json))
}

function createCard(trainers){
  for (const trainer of trainers){
    id = trainer.id
    pokemon = trainer.pokemons
    let div = document.createElement("DIV")
    main.appendChild(div)
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', id)
    card = document.getElementById(`"[data-id=${id}]"`)
    let text = document.createElement("P")
    div.appendChild(text)
    let name = document.createTextNode(trainer.name)
    text.appendChild(name) 
    let button = document.createElement("button")
    div.appendChild(button)
    button.setAttribute('data-trainer-id', id)
    button.innerText = "Add Pokemon"
    button.addEventListener("click", (e) => createPokemon(e.target))
    let ul = document.createElement("UL")
    div.appendChild(ul)
    for(const pokemon of trainer.pokemons ){
      addPokemon(pokemon)
    }
  }
}

function fetchTrainer(id){
  fetch(`${TRAINERS_URL}/${id}`)
  .then(resp => resp.json())
  .then(json => (json))
}

function createPokemon(button){
  const pokemonCount = button.parentElement.lastElementChild.childElementCount 
  if (pokemonCount !== 6){
    const configObj = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify( {
        trainer_id: button.getAttribute('data-trainer-id')
      })
    }
    fetch(POKEMONS_URL, configObj)      
    .then(resp => resp.json())
    .then(json => addPokemon(json))

  } 
}

function addPokemon(pokemon){  
  let ul = document.querySelector(`[data-id='${pokemon.trainer_id}']`).lastElementChild
  let li = document.createElement("LI")
  ul.appendChild(li)
  li.innerText = `${pokemon.nickname} (${pokemon.species})`
  let release = document.createElement("button")
  release.setAttribute('class', 'release')
  release.setAttribute('data-pokemon-id', pokemon.id)
  release.innerText = "Release"
  release.addEventListener("click", (e) => releasePokemon(e.target))
  li.appendChild(release)
}

function releasePokemon(release){
  console.log("Release ME")
  const configObj = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  }
  fetch(`${POKEMONS_URL}/${release.getAttribute('data-pokemon-id')}`, configObj)      
  .then(deletePokemon(release.getAttribute('data-pokemon-id')))

}

function deletePokemon(pokemonId){
  document.querySelector(`[data-pokemon-id='${pokemonId}']`).parentElement.remove()
}