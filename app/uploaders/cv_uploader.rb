class CVUploader < CarrierWave::Uploader::Base
  storage :fog

  def store_dir
    "uploads/cvs"
  end

end