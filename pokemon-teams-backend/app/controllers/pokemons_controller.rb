class PokemonsController < ApplicationController
    def create
        trainer = Trainer.find(params[:trainer_id])
        if trainer.pokemons.length < 6
            pokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name)
            trainer.pokemons << pokemon
            render json: pokemon, except: [:created_at, :updated_at]
        else
            render json: { response: false }
        end
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon_send = pokemon
        pokemon.delete
        render json: pokemon_send, except: [:created_at, :updated_at]
    end
end
