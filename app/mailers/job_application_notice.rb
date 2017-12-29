class JobApplicationNotice < ApplicationMailer
  default from: ENV["GMAIL_USERNAME"]

  def new_application_notice(application_id)
    @application = Application.find(application_id)
    @job = @application.job
    unless @application.cv.file.nil?
      attachments[@application.cv_identifier] = open(@application.cv.url).read
    end
    mail(to: recipient, subject: "New Job Application", reply_to: @application.email)
  end

  private

  def recipient
    if Rails.env == "development"
      return "cmathis@archwayrecruiters.com"
    else
      @job.contact_email || "cmathis@archwayrecruiters.com"
    end
  end
end