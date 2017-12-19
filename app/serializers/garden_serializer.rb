class GardenSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :photo, :user_id, :plants
end
