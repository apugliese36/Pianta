class Garden < ApplicationRecord
  has_many :plants
  validates_presence_of :name, :user_id
end
