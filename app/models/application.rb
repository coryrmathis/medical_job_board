class Application < ApplicationRecord
  belongs_to :job
  belongs_to :user
  mount_uploader :cv, CVUploader

  # Validations

  validates_inclusion_of :citizenship, in: %w(H1 J1 US GC Other), allow_blank: true, message: "'%{value}' is not a valid option for citizenship."
  validate :visa_requirements

  def new_application_notice
    "Thank you for your application! #{job.contact_name} (#{job.contact_email}) with Archway Physician Recruitment, or another recruiter with this firm, will be reaching out to you via email regarding your application."
  end

  private

  def visa_requirements
    if ["H1", "J1"].include?(self.citizenship) && self.job
      if job.visas
        unless self.job.visas.include?(self.citizenship)
          errors.add(:base, "This job does not offer sponsorship for your particular visa requirements.  Try searching for jobs that offer visa sponsorship!")
        end
      end
    end
  end

end
