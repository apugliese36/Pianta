require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::PlantsController, type: :controller do
  let!(:zucchini) do
    Plant.create(
      name: 'Zucchini Lullini',
      common_name: 'zucchini',
      user_id: 1,
      photo: 'zucchini.jpeg'
    )
  end

  let!(:sunflower) do
    Plant.create(
      name: 'Sunny',
      common_name: 'sunflower',
      user_id: 1,
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
    it 'returns a list of all gardens' do
      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['plants'].length).to eq 2
      expect(returned_json['plants'][0]['name']).to eq 'Zucchini Lullini'
      expect(returned_json['plants'][0]['common_name']).to eq 'zucchini'
      expect(returned_json['plants'][0]['photo']).to eq 'zucchini.jpeg'
      expect(returned_json['plants'][0]['user_id']).to eq 1
      expect(returned_json['plants'][0]['snapshots'].size).to eq 0

      expect(returned_json['plants'].length).to eq 2
      expect(returned_json['plants'][1]['name']).to eq 'Sunny'
      expect(returned_json['plants'][1]['common_name']).to eq 'sunflower'
      expect(returned_json['plants'][1]['photo']).to eq 'sunflower.jpeg'
      expect(returned_json['plants'][1]['user_id']).to eq 1
      expect(returned_json['plants'][1]['snapshots'].size).to eq 1
      expect(returned_json['plants'][1]['snapshots'][0]['journal_entry']).to eq
        'Sunny grew almost 4 whole inches since last time! wow!'
    end
  end

  # describe 'GET#show' do
  #   it 'returns a single hero' do
  #
  #     get :show, params: { id: magneto.id }
  #     returned_json = JSON.parse(response.body)
  #
  #     expect(response.status).to eq 200
  #     expect(response.content_type).to eq('application/json')
  #
  #     expect(returned_json['superhero']['name']).to eq 'Magneto'
  #     expect(returned_json['superhero']['superpower']).to eq 'BENDS METAL'
  #     expect(returned_json['superhero']['backstory']).to eq 'so sad'
  #     expect(returned_json['superhero']['image_url']).to eq 'magneto.com'
  #   end
  # end

  # describe 'POST#create' do
  #   it 'posts a single hero' do
  #     sign_in kjoya
  #
  #     params =
  #       {
  #         superhero:
  #           {
  #             name: 'daredevil',
  #             backstory: 'blind and stuff',
  #             superpower: 'ninja skills',
  #             image_url: 'image.png',
  #             user_id: kjoya.id
  #           }
  #       }
  #
  #     expect { post :create, params: params }.to change(Plant, :count).by(1)
  #   end
  # end
end
