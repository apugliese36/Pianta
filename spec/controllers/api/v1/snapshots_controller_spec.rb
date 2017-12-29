require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::SnapshotsController, type: :controller do
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
      journal_entry: 'Sunny grew alot',
      plant_id: zucchini.id
    )
  end

  let!(:snapshot_two) do
    Snapshot.create(
      journal_entry: 'Wow, its budding!',
      plant_id: sunflower.id
    )
  end

  let!(:snapshot_three) do
    Snapshot.create(
      journal_entry: 'so cute!!',
      plant_id: zucchini.id,
      photo: 'photo.jpeg')
  end

  describe 'GET#index' do
    it 'returns a list of all snapshots' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['snapshots'].length).to eq 3

      #reverse order
      expect(returned_json['snapshots'][2]['journal_entry']).to eq 'Sunny grew alot'
      expect(returned_json['snapshots'][2]['plant_id']).to eq zucchini.id

      expect(returned_json['snapshots'][1]['journal_entry']).to eq 'Wow, its budding!'
      expect(returned_json['snapshots'][1]['plant_id']).to eq sunflower.id

      expect(returned_json['snapshots'][0]['journal_entry']).to eq 'so cute!!'
      expect(returned_json['snapshots'][0]['plant_id']).to eq zucchini.id
      expect(returned_json['snapshots'][0]['photo']).to eq 'photo.jpeg'
    end
  end

  describe 'POST#create' do
    it 'posts a single snapshot' do
      params =
        {
          snapshot:
            {
              journal_entry: 'so green',
              photo: 'image.png',
              plant_id: sunflower.id
            }
        }

      expect { post :create, params: params }.to change(Snapshot, :count).by(1)
    end
  end
end
