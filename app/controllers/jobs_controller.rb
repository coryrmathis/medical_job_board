class JobsController < ApplicationController
  layout "no_links_in_header", only: [:description_only]
  before_action :validate_user, only: [:new, :react_browser]

  def new
  end

  def index
    if request.xhr?
      # original xhr behavior, to ask cory: are there external services that need this behavior?
      # render "index", layout: false
      if params[:job]
        jobs = Job.search(params[:job]).page(params[:page])
      else
        jobs = Job.all.page(params[:page])
      end
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
      if params[:sort]
        @jobs = Job.search(params[:job]).reorder(params[:sort]).page(params[:page])
      else
        @jobs = Job.search(params[:job]).page(params[:page])
      end
    end
  end

  def show
    @job = Job.find_by(id: params[:id]) || Job.find_by(aid: params[:id])
    render 'errors/job_unavailable' if !@job
    if request.xhr?
      if @job
        render json: {
          "raw": @job,
          "markup": @job.job_description_markup,
          "favorite": @job.users.include?(current_user)
        }.to_json
      else
        render json: {"description": "Job not found. We are sorry for the inconvenience."}.to_json
      end
    end
  end

  def description_only
    @job = Job.find_by(id: params[:id]) || Job.find_by(aid: params[:id])
    render 'errors/job_unavailable' if !@job
  end

  private
  def validate_user
    unless user_signed_in?
      redirect_to new_user_session_path and return
    end
  end
  
end