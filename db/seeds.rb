# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Garden.destroy_all
Plant.destroy_all
Snapshot.destroy_all


backyard = Garden.create(name: "Backyard Garden", description: "Parents backyard. Facing east. Shadow on the left side in afternoon.", user_id: 1)
window = Garden.create(name: "Balcony Garden", description: "Apartment Balcony. Facing north. Shadow on the right side morning and early afternoon.", user_id: 1)

zucchini = Plant.create(name: "Zuchhini Lullini", common_name: "zuchhini", garden: backyard)
bears_paw = Plant.create(name: "My Beary PAWZ", common_name: "bears paws", garden: window)
sunflower = Plant.create(name: "Sunny", common_name: "sunflower", garden: backyard)
daisy = Plant.create(name: "Peach", common_name: "daisy", garden: window)
tomatoes = Plant.create(name: "Tomato Tomato", common_name: "tomato", garden: backyard)

entry_one = Snapshot.create(journal_entry: "Wow, she's budding!!", plant: bears_paw)
entry_two = Snapshot.create(journal_entry: "Sunny grew almost 4 whole inches since last time! wow!", plant: sunflower)
entry_three = Snapshot.create(journal_entry: "so cute!!", plant: sunflower)
