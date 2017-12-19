class Plant < ApplicationRecord
  belongs_to :garden
  has_many :snapshots
  validates_presence_of :name, :garden_id
end
