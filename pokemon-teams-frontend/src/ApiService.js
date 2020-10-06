class ApiService {

  static getAllTrainers() {
    return fetch(TRAINER_URL)
    .then(response => response.json())
  }

  static postPokemon(trainerId) {
    const data = {
      trainer_id: trainerId
    }
    return fetch(POKEMON_URL, {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
  }

  static releasePokemon(pokemonId) {
    return fetch(`${POKEMON_URL}/${pokemonId}`, {
      method: 'DELETE'
    })
    .then(response => response.json())
  }

  static getTrainersAlphabetical() {
    return fetch(`${TRAINER_URL}/alphabetical`)
    .then(response => response.json())
  }
}