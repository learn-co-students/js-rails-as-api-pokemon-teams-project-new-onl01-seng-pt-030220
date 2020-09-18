class PokemonsController < ApplicationController

    def create
      trainer = Trainer.find_by(id: params["trainer_id"])
      if trainer.pokemons.length < 6 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = trainer.pokemons.create(nickname: name, species: species, trainer_id: trainer)
        render json: pokemon
      else
        render json: {message: "Sorry! You can only have 6 pokemon on your team!"}
      end
    end
  
    def destroy
      pokemon = Pokemon.find_by(id: params[:id])
      if pokemon.destroy
        render json: {message: "The pokemon has been released!"}
      end
    end
  
  end