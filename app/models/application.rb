class Application < ApplicationRecord
  belongs_to :job
  mount_uploader :cv, CVUploader

  def new_application_notice
    "Thank you for your application! #{job.contact_name} (#{job.contact_email}) with Archway Physician Recruitment, or another recruiter with this firm, will be reaching out to you via email regarding your application."
  end
end
