const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function fetchTrainers() {
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(json => {
      let trainers = json
      trainers.forEach ( (trainer) => renderTrainer(trainer))
    })
  }
  
  function renderTrainer(trainer){
    const trainerCollection = document.querySelector('main')
    const trainerCard = document.createElement('div')
    trainerCard.className = "card"
    trainerCard.dataset.id = trainer.id // trainerCard.setAttribute('data-id', trainer.id)
    trainerCollection.appendChild(trainerCard)
    const trainerName = document.createElement('p')
    trainerName.innerText = trainer.name
    trainerCard.appendChild(trainerName)
    const addPokemonButton = document.createElement('button')
    addPokemonButton.setAttribute('data-trainer-id', trainer.id)
    addPokemonButton.innerText = "Add Pokemon"
    trainerCard.appendChild(addPokemonButton)
    addPokemonButton.addEventListener('click', function(e) {
      alert(`add pokemon!! for ${trainer.name}`)
      addPokemon(e);
    })
    const ul = document.createElement('ul')
    trainerCard.appendChild(ul)
    trainer.pokemons.forEach ( (pokemon) => renderPokemon(pokemon, ul))
  }
  
  function renderPokemon(pokemon, ul){
    const li = document.createElement('li')
    li.innerText = `${pokemon.nickname} (${pokemon.species})`
    const releaseBtn = document.createElement('button')
    releaseBtn.className = "release"
    releaseBtn.dataset.id = pokemon.id // releaseBtn.setAttribute('data-pokemon-id', `${pokemon.id}`)
    releaseBtn.innerText = "Release"
    releaseBtn.addEventListener('click', function(e) {
      alert(`Release ${pokemon.nickname}!`)
      releasePokemon(e);
    })
    li.appendChild(releaseBtn)
    ul.appendChild(li)
  }
  
  function addPokemon(e){
    e.preventDefault()
    let trainerID = e.target.getAttribute('data-trainer-id')
    // console.log(e.target)
    // console.log(e.target.dataset.id) Nicky why this no workie??
    console.log(e.target.getAttribute('data-trainer-id'))
    newPokemon(trainerID, e);
  }
  
  function newPokemon(trainerID, e){
    let configObj = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
       trainer_id: trainerID
      })
    };
  
    return fetch(POKEMONS_URL, configObj)
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      const ul = e.target.nextElementSibling
      addPokemonToDOM(object, ul)
      console.log(object)
    })
  
  }
  
  function addPokemonToDOM(object, ul){
    if (object.message){
      alert(object.message)
    } else {
      renderPokemon(object, ul)
    }
  }
  
  function releasePokemon(e) {
    e.preventDefault();
    let pokemonId = e.target.getAttribute('data-id');
    // console.log(e.target);
    // console.log(pokemonId);
    deletePokemon(pokemonId, e);
  }
  
  function deletePokemon(pokemonId, e) {
    return fetch(`${POKEMONS_URL}/${pokemonId}`, {
      method: 'delete'
    })
    .then(function(response){
      return response.json();
    })
    .then(function(object){
      removePokemonFromDom(object, e);
      // console.log(object)
    })
  }
  
  function removePokemonFromDom(object, e){
      alert(object.message)
      // console.log(e.target)
      e.target.parentElement.remove();
  }
  
  fetchTrainers();