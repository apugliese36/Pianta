class PlantSerializer < ActiveModel::Serializer
  attributes :id,
             :name,
             :common_name,
             :scientific_name,
             :photo,
             :light_requirement,
             :hardiness,
             :water_requirement,
             :user_id,
             :snapshots
end
