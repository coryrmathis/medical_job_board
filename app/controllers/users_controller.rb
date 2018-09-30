class UsersController < ApplicationController
  before_action :validate_user

  def posted_jobs
    user = current_user
    @jobs = user.posted_jobs
  end

  def saved_jobs
    user = current_user
    jobs = user.saved_jobs.page(params[:page])
    if request.xhr?
      jobs_table_data = []
      jobs.each do |job|
        jobs_table_data << {
          "id": job.id,
          "specialty": job.specialty,
          "city": job.city,
          "state": job.state,
          "visas": job.visas,
          "distance_to_metro": job.distance_to_metro,
          "subspecialty_keywords": job.subspecialty_keywords
        }
      end
      render json: jobs_table_data.to_json, status: :ok, content_type: "application/json"
      return
    else
      @jobs = user.saved_jobs
    end
  end

  def update_saved_jobs
    if request.xhr?
      user = User.find(params[:id])
      # Save/unsave job via react job search
      if params[:job_id]
        puts "updating saved jobs"
        job = Job.find(params[:job_id])
        if user.saved_jobs.include? job
          user.saved_jobs.delete job
        else
          user.saved_jobs << job
        end
      end
      head :ok, content_type: "text/html"
    end
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