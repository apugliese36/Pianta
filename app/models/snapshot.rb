class Snapshot < ApplicationRecord
  belongs_to :plant
  validates_presence_of :journal_entry, :plant_id
end
