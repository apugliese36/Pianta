require 'rails_helper'
require 'spec_helper'

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

  before do
    allow(controller).to receive(:current_user) { user }
  end

  describe 'GET#index' do
    it 'returns a list of all plants' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['plants'].length).to eq 2
      expect(returned_json['plants'][0]['name']).to eq 'Zucchini Lullini'
      expect(returned_json['plants'][0]['common_name']).to eq 'zucchini'
      expect(returned_json['plants'][0]['photo']).to eq 'zucchini.jpeg'
      expect(returned_json['plants'][0]['user_id']).to eq user.id

      expect(returned_json['plants'].length).to eq 2
      expect(returned_json['plants'][1]['name']).to eq 'Sunny'
      expect(returned_json['plants'][1]['common_name']).to eq 'sunflower'
      expect(returned_json['plants'][1]['photo']).to eq 'sunflower.jpeg'
      expect(returned_json['plants'][1]['user_id']).to eq user.id
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
              user_id: user.id
            }
        }

      expect { post :create, params: params }.to change(Plant, :count).by(1)
    end
  end

  # describe 'PATCH#update' do
  #   it 'update a single plant' do
  #     params =
  #       {
  #         plant:
  #           {
  #             name: 'cutiezzz',
  #             common_name: 'sunflower',
  #             photo: 'sunflower.jpeg',
  #             user_id: user.id
  #           }
  #       }
  #     patch :update, id: sunflower, params: params
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq('application/json')
  #
  #     expect(returned_json['plant']['name']).to eq 'cutiezzz'
  #     expect(returned_json['plant']['common_name']).to eq 'sunflower'
  #     expect(returned_json['plant']['photo']).to eq 'sunflower.jpeg'
  #     expect(returned_json['plant']['user_id']).to eq user.id
  #   end
  # end

  describe 'DELETE#destroy' do
    it 'should delete a plant' do
      expect do
        delete :destroy, params: { id: sunflower.id }
      end.to change(Plant, :count).by(-1)
    end
  end
end
