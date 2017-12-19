class Plant < ApplicationRecord
  belongs_to :garden
  validates_presence_of :name, :garden_id
end
