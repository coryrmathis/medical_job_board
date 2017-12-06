class Application < ApplicationRecord
  belongs_to :job
  mount_uploader :cv, CVUploader

  
end
