class Task < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :project_id, presence: true
  belongs_to :project



  def status
    Status.find_by_id(self.status_id)
  end

  def priority
    Priority.find_by_id(self.priority_id)
  end
end
