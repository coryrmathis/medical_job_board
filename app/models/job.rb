class Job < ApplicationRecord

  scope :archway, ->{where.not(aid: nil)}
end
