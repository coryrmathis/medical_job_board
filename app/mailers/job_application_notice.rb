class JobApplicationNotice < ApplicationMailer
  default from: ENV["GMAIL_USERNAME"]

  def recruiter_notice(application_id)
    @application = Application.find(application_id)
    @job = @application.job
    unless @application.cv.file.nil?
      attachments[@application.cv_identifier] = open(@application.cv.url).read
    end
    mail(to: recruiter_email, subject: "New Job Application", reply_to: @application.email)
  end

  def applicant_notice(application_id)
    @application = Application.find(application_id)
    @job = @application.job
    mail(to: applicant_email, subject: "New Job Application", reply_to: recruiter_email)
  end

  private

  def recruiter_email
    if Rails.env == "development"
      return "cmathis@archwayrecruiters.com"
    else
      @job.contact_email || "cmathis@archwayrecruiters.com"
    end
  end

  def applicant_email
    if Rails.env == "development"
      return "cmathis@archwayrecruiters.com"
    else
      @application.email || "cmathis@archwayrecruiters.com"
    end
  end
end