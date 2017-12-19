class CreateSnapshots < ActiveRecord::Migration[5.1]
  def change
    create_table :snapshots do |t|
      t.string :journal_entry, null: false
      t.string :photo
      t.integer :plant_id, null: false

      t.timestamps
    end
  end
end
