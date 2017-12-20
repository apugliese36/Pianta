class CreatePlants < ActiveRecord::Migration[5.1]
  def change
    create_table :plants do |t|
      t.string :name, null: false
      t.string :common_name
      t.string :scientific_name
      t.string :photo
      t.string :sunlight_needs
      t.string :hardiness
      t.string :watering_needs
      t.date :birthdate
      t.integer :user_id, null: false

      t.timestamps
    end
  end
end
