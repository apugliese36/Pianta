require 'rails_helper'
require 'spec_helper'

def stub_omniauth
  OmniAuth.config.test_mode = true

  OmniAuth.config.mock_auth[:google] =
OmniAuth::AuthHash.new({
    provider: "google",
    uid: "12345678910",
    info: {
      email: "jesse@mountainmantechnologies.com",
      first_name: "Jesse",
      last_name: "Spevack"
    },
    credentials: {
      token: "abcdefg12345",
      refresh_token: "12345abcdefg",
      expires_at: DateTime.now,
    }
  })
end

RSpec.describe Api::V1::PlantsController, type: :controller do
  let!(:user) do
    User.create(
      first_name: 'Ray'
    )
  end

  let!(:zucchini) do
    Plant.create(
      name: 'Zucchini Lullini',
      common_name: 'zucchini',
      user_id: user.id,
      photo: 'zucchini.jpeg'
    )
  end

  let!(:sunflower) do
    Plant.create(
      name: 'Sunny',
      common_name: 'sunflower',
      user_id: user.id,
      photo: 'sunflower.jpeg'
    )
  end

  let!(:snapshot_one) do
    Snapshot.create(
      journal_entry: 'Sunny grew almost 4 whole inches since last time! wow!',
      plant: sunflower
    )
  end

  describe 'GET#index' do
    it 'returns a list of all plants' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['plants'].length).to eq 0
      # expect(returned_json['plants'][0]['name']).to eq 'Zucchini Lullini'
      # expect(returned_json['plants'][0]['common_name']).to eq 'zucchini'
      # expect(returned_json['plants'][0]['photo']).to eq 'zucchini.jpeg'
      # expect(returned_json['plants'][0]['user_id']).to eq 1

      # expect(returned_json['plants'].length).to eq 2
      # expect(returned_json['plants'][1]['name']).to eq 'Sunny'
      # expect(returned_json['plants'][1]['common_name']).to eq 'sunflower'
      # expect(returned_json['plants'][1]['photo']).to eq 'sunflower.jpeg'
      # expect(returned_json['plants'][1]['user_id']).to eq 1
    end
  end

  describe 'GET#show' do
    it 'returns a single plant' do

      get :show, params: { id: sunflower.id }
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['plant']['name']).to eq 'Sunny'
      expect(returned_json['plant']['common_name']).to eq 'sunflower'
      expect(returned_json['plant']['photo']).to eq 'sunflower.jpeg'
      expect(returned_json['plant']['user_id']).to eq user.id
      expect(returned_json['plant']['snapshots'].size).to eq 1
    end
  end

  describe 'POST#create' do
    it 'posts a single plant' do
      params =
        {
          plant:
            {
              name: 'cutie',
              common_name: 'cactus',
              photo: 'image.png',
              user_id: 1
            }
        }

      expect { post :create, params: params }.to change(Plant, :count).by(0)
    end
  end
end
