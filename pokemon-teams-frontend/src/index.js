const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then((objects) => {
        const main = document.querySelector("main")
        for (const object of objects) {
            const div = document.createElement("div")
            main.appendChild(div)
            div.className = "card"
            div.setAttribute("data-id", object["id"])
            const name = document.createElement("p")
            name.innerText = object["name"]
            div.appendChild(name)
            const addButton = document.createElement("button")
            addButton.setAttribute("data-trainer-id", object["id"])
            addButton.innerText = "Add Pokemon"
            addButton.addEventListener("click", (e) => {
                e.preventDefault()
                const configObject = {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        trainer_id: addButton.getAttribute("data-trainer-id")
                    })
                }
                fetch(POKEMONS_URL, configObject)
                .then(response => response.json())
                .then(object => {
                    console.log(object["response"])
                    if (object["response"] == undefined) {
                        const cards = document.querySelectorAll("div.card")
                        for (const card of cards) {
                            if (card.getAttribute("data-id") == addButton.getAttribute("data-trainer-id")) {
                                const addToList = card.querySelector("ul")
                                card.appendChild(addToList)
                                const newPokemon = document.createElement("li")
                                addToList.appendChild(newPokemon)
                                newPokemon.innerText = `${object["species"]} (${object["nickname"]})`
                                const addReleaseButton = document.createElement("button")
                                newPokemon.appendChild(addReleaseButton)
                                addReleaseButton.innerText = "Release"
                                addReleaseButton.className = "release"
                                addReleaseButton.setAttribute("data-pokemon-id", object["id"])
                                addReleaseButton.addEventListener("click", (e) => {
                                    e.preventDefault()
                                    fetch(`${POKEMONS_URL}/${addReleaseButton.getAttribute("data-pokemon-id")}`, {method: "DELETE"})
                                    .then(response => response.json())
                                    .then(object => {
                                        addReleaseButton.parentNode.remove()
                                    })
                                })
                            }
                        }
                    }
                })
            })
            div.appendChild(addButton)
            const list = document.createElement("ul")
            div.appendChild(list)
            for (const pokemon of object["pokemons"]) {
                const li = document.createElement("li")
                list.appendChild(li)
                li.innerText = `${pokemon["species"]} (${pokemon["nickname"]})`
                const releaseButton = document.createElement("button")
                li.appendChild(releaseButton)
                releaseButton.innerText = "Release"
                releaseButton.className = "release"
                releaseButton.setAttribute("data-pokemon-id", pokemon["id"])
                releaseButton.addEventListener("click", (e) => {
                    e.preventDefault()
                    fetch(`${POKEMONS_URL}/${releaseButton.getAttribute("data-pokemon-id")}`, {method: "DELETE"})
                    .then(response => response.json())
                    .then(object => {
                        releaseButton.parentNode.remove()
                    })
                })
            }
        }
    })
})