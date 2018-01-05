class User < ApplicationRecord
  has_many :plants
  def self.update_or_create(auth)
    user = User.find_by(uid: auth[:uid]) || User.new
    user.attributes = {
      provider: auth[:provider],
      uid: auth[:uid],
      email: auth[:info][:email],
      first_name: auth[:info][:first_name],
      last_name: auth[:info][:last_name],
      token: auth[:credentials][:token],
      refresh_token: auth[:credentials][:refresh_token],
      oauth_expires_at: auth[:credentials][:expires_at]
    }
    unless User.find_by(uid: auth[:uid])
      user.save!
      example_plant = Plant.create(name: 'Example Plant', common_name: 'Nickname', birthdate: '2017-12-12', user: user, sunlight_needs: 'Sunny (Direct Sun)', watering_needs: 'Weekly', photo: '/assets/leaf-favicon')
      entry_seven = Snapshot.create(journal_entry: 'To delete this Example Plant, click the edit button in the top right and click "Delete Plant"', plant: example_plant)
      entry_five = Snapshot.create(journal_entry: 'You can also create journal entries whenever you water your plant so you can keep track of you watering schedule.', plant: example_plant)
      entry_four = Snapshot.create(journal_entry: 'Viewing images such as this one will help visualize your plant\'s growth.', plant: example_plant, photo: '/assets/leaf-favicon')
      entry_two = Snapshot.create(journal_entry: 'This journal entry does not have a photo. Click on me to view me on the right.', plant: example_plant)
      entry_one = Snapshot.create(journal_entry: 'This is a journal entry and it also have a photo. Click on me to view me on the right.', plant: example_plant, photo: '/assets/leaf-favicon')
      entry_three = Snapshot.create(journal_entry: 'You can create journal entries like this one to document your plants. Just click "New Entry"', plant: example_plant, photo: '/assets/leaf-favicon')
      entry_six = Snapshot.create(journal_entry: 'This is the most recent journal entry. You may scroll and click on other journal entries to view them.', plant: example_plant)
      user
    else
      user.save!
      user
    end
    # user.save!
    # user
  end
end
