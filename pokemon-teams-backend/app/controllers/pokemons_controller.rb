require 'pry'

class PokemonsController < ApplicationController
    
    def index 
        pokemon = Pokemon.all 
        render json: pokemon 
    end 
        
        def show 
        pokemon  = Pokemon.find_by(id: params[:id])
        render json: pokemon
        end
def create 
trainer = Trainer.find_by(id:params[:trainer_id])
pokemon = trainer.pokemon.build({
    nickname: Faker::Name.first_name,
    species: Faker::Games::Pokemon.name 
    }) 
    if pokemon.validate
    pokemon.save
    render json:pokemon 
    else 
    nil
    end 
end

def destroy 
pokemon  = Pokemon.find_by(id:params[:id])
pokemon.destroy
end

end
