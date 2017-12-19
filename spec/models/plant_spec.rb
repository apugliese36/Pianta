require 'rails_helper'
require 'spec_helper'

RSpec.describe Plant, type: :model do
  it { should have_valid(:name).when('Sunny') }
  it { should_not have_valid(:name).when(nil, '') }

  it { should have_valid(:common_name).when('Sunflower', nil, '') }

  it { should have_valid(:scientific_name).when('Ex Glorioba', nil, '') }

  it { should have_valid(:photo).when('photo.png', nil, '') }

  it { should have_valid(:light_requirement).when('Full Sun', nil, '') }

  it { should have_valid(:soil_type).when('soil', nil, '') }

  it { should have_valid(:water_requirement).when('Very-low-water', nil, '') }

  it { should have_valid(:garden_id).when(1) }
  it { should_not have_valid(:garden_id).when(nil) }
end
