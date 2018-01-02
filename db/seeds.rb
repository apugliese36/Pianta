# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Plant.destroy_all
Snapshot.destroy_all

zucchini = Plant.create(name: "Zuchhini Lullini", common_name: "Zuchhini", birthdate: '2017-12-1', user_id: 1, photo: 'http://c8.alamy.com/comp/F7G72M/zucchini-plant-with-fruit-female-male-flowers-F7G72M.jpg')
bears_paw = Plant.create(name: "My Beary PAWZ", common_name: "Bears paws", birthdate: '2017-12-1', user_id: 1, photo: 'http://3.bp.blogspot.com/_beXKZ7eWmUE/R6TfUwMRmqI/AAAAAAAAACc/rzdvU_Ncd_M/s320/Bear+Paw+Whole.JPG')
sunflower = Plant.create(name: "Sunny", common_name: "Sunflower", birthdate: '2017-11-5', user_id: 1, sunlight_needs: 'Sunny (Direct Sun)', watering_needs: 'Weekly', photo: 'https://celebrateurbanbirds.org/wp-content/uploads/2014/08/Sunflower-e1424703701589.jpg')
daisy = Plant.create(name: "Peach", common_name: "Daisy", birthdate: '2017-12-7', user_id: 1, photo: 'http://gardeningsolutions.ifas.ufl.edu/images/plants/flowers/bush_daisy_krumfolz.jpg')
tomatoes = Plant.create(name: "Tomato Tomato", common_name: "tomato", birthdate: '2017-11-18', user_id: 1, photo: 'https://www.rodalesorganiclife.com/sites/rodalesorganiclife.com/files/styles/listicle_slide_custom_user_phone_1x/public/tomatoplants_africa_studio_102522.jpg?itok=kPHVDTXw')

entry_one = Snapshot.create(journal_entry: "Wow, she's budding!!", plant: bears_paw)
entry_two = Snapshot.create(journal_entry: "Sunny grew almost 4 whole inches since last time! wow!", plant: sunflower)
entry_three = Snapshot.create(journal_entry: "so cute!!", plant: sunflower, photo: 'https://celebrateurbanbirds.org/wp-content/uploads/2014/08/Sunflower-e1424703701589.jpg')
