class Task < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :project_id, presence: true

end
