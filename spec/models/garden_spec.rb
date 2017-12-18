require 'rails_helper'
require 'spec_helper'

RSpec.describe Garden, type: :model do
  it { should have_valid(:name).when('Cute Plantyz') }
  it { should_not have_valid(:name).when(nil, '') }

  it { should have_valid(:description).when('My balcony garden! Facing east.', nil, '') }

  it { should have_valid(:photo).when('garden_pic.png', nil, '') }

  it { should have_valid(:user_id).when(4, 1937343) }
  it { should_not have_valid(:user_id).when(nil, '') }
end
