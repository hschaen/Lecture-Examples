class Herb < ApplicationRecord
  validates :name, :is_watered, presence: true
  validates :name, uniqueness: true
end
