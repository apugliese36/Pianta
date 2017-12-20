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


backyard = Garden.create(name: "Backyard Garden", description: "Parents backyard. Facing east. Shadow on the left side in afternoon.", photo: 'https://www.gardenbythesea.org/site/assets/files/1813/mg_6800_perennial_g_sm.jpg', user_id: 1)
window = Garden.create(name: "Balcony Garden", description: "Apartment Balcony. Facing north. Shadow on the right side morning and early afternoon.", photo: 'http://clv.h-cdn.co/assets/17/20/980x653/indoor-flower-box-little-paths.jpg', user_id: 1)

zucchini = Plant.create(name: "Zuchhini Lullini", common_name: "zuchhini", garden: backyard, photo: 'http://c8.alamy.com/comp/F7G72M/zucchini-plant-with-fruit-female-male-flowers-F7G72M.jpg')
bears_paw = Plant.create(name: "My Beary PAWZ", common_name: "bears paws", garden: window, photo: 'http://3.bp.blogspot.com/_beXKZ7eWmUE/R6TfUwMRmqI/AAAAAAAAACc/rzdvU_Ncd_M/s320/Bear+Paw+Whole.JPG')
sunflower = Plant.create(name: "Sunny", common_name: "sunflower", garden: backyard, photo: 'https://celebrateurbanbirds.org/wp-content/uploads/2014/08/Sunflower-e1424703701589.jpg')
daisy = Plant.create(name: "Peach", common_name: "daisy", garden: window, photo: 'http://gardeningsolutions.ifas.ufl.edu/images/plants/flowers/bush_daisy_krumfolz.jpg')
tomatoes = Plant.create(name: "Tomato Tomato", common_name: "tomato", garden: backyard, photo: 'https://www.rodalesorganiclife.com/sites/rodalesorganiclife.com/files/styles/listicle_slide_custom_user_phone_1x/public/tomatoplants_africa_studio_102522.jpg?itok=kPHVDTXw')

entry_one = Snapshot.create(journal_entry: "Wow, she's budding!!", plant: bears_paw)
entry_two = Snapshot.create(journal_entry: "Sunny grew almost 4 whole inches since last time! wow!", plant: sunflower)
entry_three = Snapshot.create(journal_entry: "so cute!!", plant: sunflower)
