class NewJobApplicationNoticeEmail
  include Sidekiq::Worker

  def perform(application_id)
    JobApplicationNotice.new_application_notice(application_id).deliver
  end
end