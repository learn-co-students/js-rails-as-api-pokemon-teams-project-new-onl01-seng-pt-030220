class PokemonsController < ApplicationController
    def index
        pokemons =Pokemon.all
        render json: pokemons
    end

    def show
        pokemon = Pokemon.find_by(id: params[:id])
        render json: pokemon
    end

    def create 
        #byebug
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = trainer.pokemons.build({
            nickname: Faker::Name.first_name,
            species: Faker::Games::Pokemon.name
        })  
        if pokemon.save 
            # byebug 
            render json: pokemon
        else 
            # byebug
            render json: {message: pokemon.errors.messages[:max][0]}
        end
        # if trainer.pokemons.length < 6
        #     name = Faker::Name.first_name
        #     species = Faker::Games::Pokemon.name
        #     pokemon = Pokemon.create(
        #         nickname: name, 
        #         species: species, 
        #         trainer_id: trainer.id
        #     )
        #     render json: pokemon
        # end
    end

    def destroy
        pokemon = Pokemon.all.find_by(id: params[:id])
        trainer = pokemon.trainer
        pokemon.destroy
        render json: trainer, include: [:pokemons]
    end

end