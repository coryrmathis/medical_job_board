class UsersController < ApplicationController
  before_action :validate_user

  def posted_jobs
    user = current_user
    @jobs = user.posted_jobs
  end

  def applications
    user = User.find(params[:id])
    @applications = user.applications
  end

  private
  def validate_user
    unless user_signed_in? && current_user == User.find(params[:id])
      redirect_to '/'
    end
  end

end