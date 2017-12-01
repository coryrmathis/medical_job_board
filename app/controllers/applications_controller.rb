class ApplicationsController < ApplicationController

  def create
    application = Application.new(application_params)
    redirect_to :root if application.save
  end

  private

  def application_params
    params.require(:application).permit(
      :first_name,
      :last_name,
      :email,
      :specialty,
      :location_preference,
      :cv
    )
  end
end