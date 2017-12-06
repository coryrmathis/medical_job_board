class CVUploader < CarrierWave::Uploader::Base
  storage :fog

  def store_dir
    "uploads/cvs"
  end

  def cache_dir
    "tmp/cvs"
  end
end