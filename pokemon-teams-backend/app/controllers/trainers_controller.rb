class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: TrainerSerializer.new(trainers)
    end

    def show
        trainer = Trainer.find(params[:id])
        render json: trainer, only:[:id, :name], include: {pokemons: { except: [:created_at, :updated_at]}}
    end 

end
