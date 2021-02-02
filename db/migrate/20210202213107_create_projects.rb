class CreateProjects < ActiveRecord::Migration[6.1]
  def change
    create_table :projects do |t|
      t.string :name
      t.string :prefix
      t.integer :creator_id
      t.string :users
      t.timestamps
    end
  end
end
