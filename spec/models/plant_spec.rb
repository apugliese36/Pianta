require 'rails_helper'
require 'spec_helper'

RSpec.describe Plant, type: :model do
  it { should have_valid(:name).when('Sunny') }
  it { should_not have_valid(:name).when(nil, '') }

  it { should have_valid(:common_name).when('Sunflower', nil, '') }

  it { should have_valid(:scientific_name).when('Ex Glorioba', nil, '') }

  it { should have_valid(:photo).when('photo.png', nil, '') }

  it { should have_valid(:sunlight_needs).when('Full Sun', nil, '') }

  it { should have_valid(:hardiness).when('soil', nil, '') }

  it { should have_valid(:watering_needs).when('Very-low-water', nil, '') }

  it { should have_valid(:user_id).when(1) }
  it { should_not have_valid(:user_id).when(nil) }
end
