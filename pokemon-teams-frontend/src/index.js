const TRAINER_URL = 'http://localhost:3000/trainers'
const POKEMON_URL = 'http://localhost:3000/pokemons'

const body = document.querySelector('body')
const main = document.querySelector('main')
const alphabeticalBtn = document.createElement('button')
alphabeticalBtn.innerText = 'Alphabetical'
const orgOrderBtn = document.createElement('button')
orgOrderBtn.innerText = 'Reorder'

const toggleLabel = document.createElement('label')
toggleLabel.className = 'switch'
const toggleInput = document.createElement('input')
toggleInput.type = 'checkbox'
const toggleSpan = document.createElement('span')
toggleSpan.className = 'slider round'
toggleLabel.append(toggleInput, toggleSpan)
main.append(toggleLabel, alphabeticalBtn, orgOrderBtn)

const trainerCardCollection = document.createElement('div')
trainerCardCollection.className = 'card-collection'
main.appendChild(trainerCardCollection)



displayTrainers(); 

orgOrderBtn.addEventListener('click', () => {
  trainerCardCollection.innerHTML = ''
  displayTrainers();
})


alphabeticalBtn.addEventListener('click', () => {
  ApiService.getTrainersAlphabetical()
  .then(trainers => {
    trainerCardCollection.innerHTML = ''
    trainers.forEach(trainer => {
      new Trainer(trainer)
    })
  })
})


function displayTrainers() {
  ApiService.getAllTrainers()
  .then(trainers => {
    trainers.forEach(trainer => {
      new Trainer(trainer)
    })
  })
}

toggleSpan.addEventListener('click', () => {
  if (body.className === 'light-mode') {
    body.className = 'dark-mode'
  } else {
    body.className = 'light-mode'
  }
})

















//struggles
//pass in ul to renderPokemon
/*for post
  passing in e to have the ul available for appending
    e.target.nextElementSibling
    pass in ul AGAIN to render pokemon (we knew, cause kept coming up as undefined, 
      just didn't know to use the e.target.nextElementSibling to make var)
        fuck that
    message hash alert - just didn't know it was thing - we totally stole it
*/