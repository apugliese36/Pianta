class Plant < ApplicationRecord
  has_many :snapshots
  belongs_to :user
  validates_presence_of :name, :user_id
end
