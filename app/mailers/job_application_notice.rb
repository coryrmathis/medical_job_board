class JobApplicationNotice < ApplicationMailer
  default from: ENV["GMAIL_USERNAME"]

  def new_application_notice(recruiter_email, candidate_info)
    mail(to: recruiter_email, subject: "New Job Application")
  end
end