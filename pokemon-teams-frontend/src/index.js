const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

document.addEventListener("DOMContentLoaded", () => {
    fetchTrainers()
})

function fetchTrainers() {
    fetch(TRAINERS_URL).then(response => response.json()).then(json => createCard(json))
}

function fetchTrainer(id){
    fetch(`${TRAINERS_URL}/${id}`).then(resp => resp.json()).then(json => (json))
}

function createCard(trainers) {
    let trainersArr = trainers.data
    for(const trainer of trainersArr){
        let div = createDiv(trainer.id)
        let text = document.createElement('p')
        let name = document.createTextNode(trainer.attributes.name)
        let button = createAddPokemonButton(trainer.id)
        let ul = document.createElement('ul')
        
        main.appendChild(div)
        div.appendChild(text)
        text.appendChild(name)
        div.appendChild(button)
        div.appendChild(ul)

        for(const pokemon of trainer.attributes.pokemons) {
            addPokemon(pokemon)
        }
    }
}

function createDiv(id) {
    let div = document.createElement('div')
    main.appendChild(div)
    div.setAttribute('class', 'card')
    div.setAttribute('data-id', id)
    return div
}

function createAddPokemonButton(id) {
    let button = document.createElement('button')
    button.setAttribute('data-trainer-id', id)
    button.innerText = 'Add Pokemon'
    button.addEventListener('click', (e) => createPokemon(e.target))
    return button
}

function createReleasePokemonButton(id) {
    let button = document.createElement('button')
    button.setAttribute('class', 'release')
    button.setAttribute('data-pokemon-id', id)
    button.innerText = 'Release'
    button.addEventListener('click', (e) => releasePokemon(e.target))
    return button
}

function addPokemon(pokemon) {
    let ul = document.querySelector(`[data-id='${pokemon.trainer_id}']`).lastElementChild
    let li = document.createElement('li')
    ul.appendChild(li)
    li.innerText = `${pokemon.nickname} - ${pokemon.species}`
    let release = createReleasePokemonButton(pokemon.id)
    li.appendChild(release)
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
      fetch(POKEMONS_URL, configObj).then(resp => resp.json()).then(json => addPokemon(json))
    } 
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
    fetch(`${POKEMONS_URL}/${release.getAttribute('data-pokemon-id')}`, configObj).then(deletePokemon(release.getAttribute('data-pokemon-id')))
  
}

function deletePokemon(pokemonId){
    document.querySelector(`[data-pokemon-id='${pokemonId}']`).parentElement.remove()
}