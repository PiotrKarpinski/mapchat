class Message < ApplicationRecord
  before_create :set_poster


  def set_poster
  end
end
