class TrainersController < ApplicationController

  def index 
    trainers = Trainer.all 
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end 

  def alphabetical
    trainers = Trainer.all.order(:name)
    render json: TrainerSerializer.new(trainers).to_serialized_json
  end 

end
