class Application < ApplicationRecord
  has_one :job
  mount_uploader :cv, CVUploader

  
end
