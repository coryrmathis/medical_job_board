class JobApplicationNotice < ApplicationMailer
  default from: ENV["GMAIL_USERNAME"]

  def new_application_notice(application_id)
    @application = Application.find(application_id)
    @job = @application.job
    unless @application.cv.file.nil?
      attachments[@application.cv_identifier] = open(@application.cv.url).read
    end
    mail(to: @job.contact_email || "coryrmathis@gmail.com", subject: "New Job Application")
  end
end