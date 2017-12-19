require 'rails_helper'
require 'spec_helper'

RSpec.describe Api::V1::GardensController, type: :controller do

  let!(:backyard) do
    Garden.create(
      name: 'Backyard Garden',
      description: 'Parents backyard. Facing east. Shadow on the left side in afternoon.',
      user_id: 1
    )
  end

  let!(:sunflower) do
    Plant.create(
      name: "Sunny",
      common_name: "sunflower",
      garden: backyard)
  end

  describe 'GET#index' do
    it 'returns a list of all gardens' do

      get :index
      returned_json = JSON.parse(response.body)

      expect(response.status).to eq 200
      expect(response.content_type).to eq('application/json')

      expect(returned_json['gardens'].length).to eq 1
      expect(returned_json['gardens'][0]['name']).to eq 'Backyard Garden'
      expect(returned_json['gardens'][0]['description']).to eq 'Parents backyard. Facing east. Shadow on the left side in afternoon.'
      expect(returned_json['gardens'][0]['user_id']).to eq 1
      expect(returned_json['gardens'][0]['plants'].size).to eq 1
      expect(returned_json['gardens'][0]['plants'][0]['name']).to eq 'Sunny'
      expect(returned_json['gardens'][0]['plants'][0]['common_name']).to eq 'sunflower'
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
  #     expect { post :create, params: params }.to change(Superhero, :count).by(1)
  #   end
  # end
end
