class Specialty < ApplicationRecord

  validates :name, uniqueness: true, presence: true

end
