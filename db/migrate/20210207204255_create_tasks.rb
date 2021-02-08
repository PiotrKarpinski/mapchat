class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :description
      t.string :users
      t.belongs_to(:project, foreign_key: true, type: :integer)
      t.integer :priority_id
      t.integer :status_id
      t.timestamps
    end
  end
end
