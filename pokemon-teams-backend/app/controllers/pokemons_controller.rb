class PokemonsController < ApplicationController
    def index
        @pokemons =Pokemon.all
        render json: @pokemons
    end

    def create 
        #byebug

    end

    def destroy
        pokemon = Pokemon.all.find_by(id: params[:id])
        trainer = pokemon.trainer
        pokemon.destroy
        render json: trainer, include: [:pokemons]
    end

end