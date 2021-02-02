class Project < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :creator_id, presence: true
  validates :users, length: { minimum: 1 }

end
