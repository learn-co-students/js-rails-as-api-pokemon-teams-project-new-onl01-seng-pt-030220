class Pokemon < ApplicationRecord
  belongs_to :trainer

  validate do 
    valid_count? 
  end

  private 
  def valid_count? 
  if self.trainer.pokemon.count < 6 
    true 
  else 
    self.errors.add("too greedy")
  end
  end

end
