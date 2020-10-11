class Trainer {

  constructor(trainer){
    this.trainer = trainer
    this.trainerCard = this.createCard()
  }

  createCard(){
    const trainerCard = document.createElement('div')
    trainerCard.className = 'card light-mode'
    trainerCard.dataset.id = this.trainer.id
    trainerCardCollection.appendChild(trainerCard)
    this.renderCardContent(trainerCard)
  }

  renderCardContent(trainerCard){
    const trainerName = document.createElement('p')
    trainerName.innerText = this.trainer.name
    const addBtn = document.createElement('button')
    addBtn.setAttribute('data-trainer-id', `${this.trainer.id}`)
    addBtn.innerText = 'Add Pokemon'
    this.addBtnHandler(addBtn, trainerCard) 
    const pokemonUl = document.createElement('ul')
    this.trainer.pokemons.forEach(pokemon => {
      const pokemonLi = document.createElement('li')
      pokemonLi.innerText = `${pokemon.nickname} (${pokemon.species})`
      const releaseBtn = document.createElement('button')
      releaseBtn.innerText = 'Release'
      releaseBtn.setAttribute('data-pokemon-id', `${pokemon.id}`)
      this.releaseBtnHandler(releaseBtn, pokemon, trainerCard)
      pokemonLi.appendChild(releaseBtn)
      pokemonUl.append(pokemonLi)
    })
    trainerCard.append(trainerName, addBtn, pokemonUl)
  }

  releaseBtnHandler(releaseBtn, pokemon, trainerCard) {
    releaseBtn.addEventListener('click', () => {
      ApiService.releasePokemon(pokemon.id)
        .then(updatedTrainer => {
          trainerCard.innerHTML = ''
          this.trainer = updatedTrainer
          this.renderCardContent(trainerCard)
        })
    })
  }

  addBtnHandler(addBtn, trainerCard) {
    addBtn.addEventListener('click', () => {
      ApiService.postPokemon(this.trainer.id)
        .then(updatedTrainer => {
          trainerCard.innerHTML = ''
          this.trainer = updatedTrainer
          this.renderCardContent(trainerCard)
        })
    })
  }
}