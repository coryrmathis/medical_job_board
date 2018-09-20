class UsersController < ApplicationController
  before_action :validate_user

  def saved_jobs
    user = User.find(params[:id])
    jobs = user.favorites.page(params[:page])
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
      render json: jobs_table_data.to_json
      return
    else
      @jobs = user.favorites
    end
  end

  def update_saved_jobs
    if request.xhr?
      user = User.find(params[:id])
      # Save/unsave job via react job search
      if params[:job_id]
        puts "updating saved jobs"
        job = Job.find(params[:job_id])
        if user.favorites.include? job
          user.favorites.delete job
        else
          user.favorites << job
        end
      end
    end
  end

  private
  def validate_user
    unless user_signed_in? && current_user == User.find(params[:id])
      redirect_to '/'
    end
  end

end