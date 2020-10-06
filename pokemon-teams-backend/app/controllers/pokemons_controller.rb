class PokemonsController < ApplicationController

  def create 
    trainer = Trainer.find_by(id: params['trainer_id'])
    if trainer.pokemons.length < 6 
      name = Faker::Name.first_name
      species = Faker::Games::Pokemon.name
      pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params['trainer_id'])
      trainer.pokemons << pokemon
      render json: TrainerSerializer.new(trainer).to_serialized_json
    else 
      render json: {message: 'Sorry! Only 6 Pokemon per Team!'}
    end 
  end 

  def destroy
    pokemon = Pokemon.find_by(id: params[:id])
    pokemon.destroy 
    trainer = Trainer.find_by(id: pokemon.trainer_id)
    render json: TrainerSerializer.new(trainer).to_serialized_json
  end
end
