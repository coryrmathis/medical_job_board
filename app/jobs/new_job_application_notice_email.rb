class NewJobApplicationNoticeEmail
  include Sidekiq::Worker

  def perform(application_id)
    JobApplicationNotice.recruiter_notice(application_id).deliver
    JobApplicationNotice.applicant_notice(application_id).deliver
  end
end