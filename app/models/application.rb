class Application < ApplicationRecord
  mount_uploader :cv, CVUploader
end
