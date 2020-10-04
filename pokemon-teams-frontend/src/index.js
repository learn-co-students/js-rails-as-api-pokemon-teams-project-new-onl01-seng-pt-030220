const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => loadTrainers())

const loadTrainers = () => {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
    })
}

const renderTrainer = (trainer) => {
    const div = document.createElement("div")
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")

    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainer.id)
    
    p.innerHTML = trainer.name
    
    button.setAttribute("data-trainer-id", trainer.id)
    button.innerHTML = "Add Pokemon"
    button.addEventListener("click", function(e) {
        createPokemon(e)
        alert(`Add a Pokemon for ${trainer.name}!`)
    })

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    main.appendChild(div)
    trainer.pokemons.forEach(pokemon => renderPokemon(pokemon))
}
const renderPokemon = (pokemon) => {
    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")

    li.innerHTML = `${pokemon.nickname} - ${pokemon.species}`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerHTML = "Release"
    button.addEventListener("click", function(e) {
        deletePokemon(e);
        alert(`You're free now ${pokemon.nickname}, the ${pokemon.species}!` )
    })

    li.appendChild(button)
    ul.appendChild(li)
}

const createPokemon = (e) => {
    e.preventDefault()
    const configObj = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept':'application/json'
        },
        body: JSON.stringify({trainer_id: e.target.dataset.trainerId})
    }

    fetch(POKEMONS_URL, configObj)
    .then(resp => resp.json())
    .then(json => 
        json.message ? alert(json.message) : renderPokemon(json) 
    )
}

const deletePokemon = (e) => {
    e.preventDefault()
    
    const configObj = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }


    fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, configObj)
        e.target.parentElement.remove()
}