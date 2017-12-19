class CreateGardens < ActiveRecord::Migration[5.1]
  def change
    create_table :gardens do |t|
      t.string :name, null: false
      t.string :description
      t.string :photo
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
