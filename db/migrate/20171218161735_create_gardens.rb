class CreateGardens < ActiveRecord::Migration[5.1]
  def change
    create_table :gardens do |t|
      t.string :name, null: false
      t.string :desciption
      t.string :photo
      t.integer :user_id, null: false
    end
  end
end
