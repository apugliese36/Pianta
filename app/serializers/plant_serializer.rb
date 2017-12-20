class PlantSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :common_name,
             :scientific_name,
             :photo,
             :sunlight_needs,
             :hardiness,
             :watering_needs,
             :birthdate,
             :user_id,
             :snapshots
end
