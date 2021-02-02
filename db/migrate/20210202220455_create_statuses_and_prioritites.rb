class CreateStatusesAndPrioritites < ActiveRecord::Migration[6.1]
  def change
    create_table :statuses do |t|
      t.string :name
      t.belongs_to(:project, foreign_key: true, type: :integer)
    end
    create_table :priorities do |t|
      t.string :name
      t.belongs_to(:project, foreign_key: true, type: :integer)
    end
  end
end
