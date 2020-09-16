const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const main = document.querySelector("main")

document.addEventListener("DOMContentLoaded", () => fetchTrainer())

///we fetch all traners with associates 
function fetchTrainer() {

    fetch(`${BASE_URL}/trainers`)
        .then(response => response.json())
        .then(data => data.forEach(trainer => renderTrainers(trainer)))

}


const renderTrainers = (trainerObj) => {

    const div = document.createElement('div')
    const p = document.createElement("p")
    const button = document.createElement("button")
    const ul = document.createElement("ul")
    div.setAttribute("class", "card")
    div.setAttribute("data-id", trainerObj.id)
    button.setAttribute("data-trainer-id", trainerObj.id)
    p.innerHTML = trainerObj.name
    button.innerHTML = "Add Pokemon"

    //create pokemon

    button.addEventListener("click", createPokemon)

    div.appendChild(p)
    div.appendChild(button)
    div.appendChild(ul)

    main.appendChild(div)

    //render pokemons
    trainerObj.pokemons.forEach(pokemon => {
        renderPokemon(pokemon)

    })
}


const renderPokemon = (pokemon) => {

    const ul = document.querySelector(`div[data-id="${pokemon.trainer_id}"]`)
    const li = document.createElement("li")
    const button = document.createElement("button")
    li.innerHTML += `${pokemon.nickname} (${pokemon.species})`
    button.setAttribute("class", "release")
    button.setAttribute("data-pokemon-id", pokemon.id)
    button.innerHTML = "Release"

    //delete pokemon
    button.addEventListener("click", releasePokemon)

    li.appendChild(button)
    ul.appendChild(li)

}

const createPokemon = (e) => {
    e.preventDefault()


    fetch("http://127.0.0.1:3000/pokemons", {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                trainer_id: e.target.dataset.trainerId
            }),
        })
        .then(response => response.json())
        .then(pokemon => renderPokemon(pokemon))

}

const releasePokemon = (e) => {
    e.preventDefault()

    fetch(`http://127.0.0.1:3000/pokemons/${e.target.dataset.pokemonId}`, {
        method: "DELETE",
        headers: {
            "Content-type": "applaication/json",
            "Accept": "applaication/json",
        }
    })
    e.target.parentNode.remove()

}