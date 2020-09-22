class PokemonsController < ApplicationController
    def index
        pokemons = Pokemon.all
        render json: pokemons, only: [:id, :nickname, :species, :trainer_id]
    end

    def show
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, only: [:id, :nickname, :species, :trainer_id]
    end

    def create
        trainer = Trainer.find(params[:trainer_id])
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        render json: Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
    end

    def destroy
        Pokemon.find(params[:id]).destroy
    end
end
