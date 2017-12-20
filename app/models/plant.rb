class Plant < ApplicationRecord
  has_many :snapshots
  validates_presence_of :name, :user_id
end
