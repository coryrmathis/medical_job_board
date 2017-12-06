class ApplicationsController < ApplicationController

  def create
    application = Application.new(application_params)
    
    if application.save
      redirect_back fallback_location: root_path, notice: "Application successfully submitted"
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
      :visa_requirements,
      :job_id,
      :cv
    )
  end
end