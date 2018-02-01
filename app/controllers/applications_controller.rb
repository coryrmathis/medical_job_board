class ApplicationsController < ApplicationController

  def create

    application = Application.new(application_params)
    
    if application.save
      NewJobApplicationNoticeEmail.perform_async(application.id)
      redirect_back fallback_location: root_path, notice: application.new_application_notice
    else
      errors = application.errors.full_messages.join(" | ")
      redirect_to job_path(application.job), alert: errors
    end
  end

  private

  def application_params
    params.require(:application).permit(
      :first_name,
      :last_name,
      :email,
      :specialty,
      :location_preference,
      :citizenship,
      :job_id,
      :comments,
      :cv,
      :phone_number
    )
  end
end