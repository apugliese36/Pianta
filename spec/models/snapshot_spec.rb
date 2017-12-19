require 'rails_helper'
require 'spec_helper'

RSpec.describe Snapshot, type: :model do
  it { should have_valid(:journal_entry).when('Grew 4 inches!') }
  it { should_not have_valid(:journal_entry).when(nil, '') }

  it { should have_valid(:photo).when('photo.png', nil, '') }

  it { should_not have_valid(:plant_id).when(nil) }
end
