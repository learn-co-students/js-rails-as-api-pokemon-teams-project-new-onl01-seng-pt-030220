class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do
    pokemon_count_valid?
  end

  private 
  def pokemon_count_valid?
    if self.trainer.pokemons.count >= 6
      self.errors.add(:max, "You can only hold 6 Pokemon")
    end
  end
  
end
