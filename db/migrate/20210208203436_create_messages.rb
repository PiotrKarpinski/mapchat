class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :content
      t.integer  :task_id
      t.integer  :poster_id
      t.integer  :getter_id
      t.datetime :read,  null: false
      t.datetime :sent, null: false
    end
  end
end
