class JobsController < ApplicationController
  layout "no_links_in_header", only: [:description_only]
  before_action :user_is_poster?, only: [:new, :create, :edit, :update, :destroy]

  def new
    @job = Job.new
    render 'new_edit'
  end

  def create
    job = current_user.posted_jobs.new(job_params)
    job.job_description = ActionController::Base.helpers.sanitize(job.job_description)
    if job.save
      redirect_to job_path job
    else
      redirect_to "/"
    end
  end

  def edit
    @job = Job.find(params[:id])
    render 'new_edit'
  end

  def update
    job = Job.find(params[:id])
    job.update(job_params)
    redirect_to job_path job
  end

  def destroy
    job = Job.find(params[:id])
    job.delete
    redirect_to posted_jobs_path current_user
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
      render json: jobs_table_data.to_json, status: :ok, content_type: "application/json"
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
          "savedJob": @job.interested_users.include?(current_user)
        }.to_json, status: :ok, content_type: "application/json"
      else
        render json: {"description": "Job not found. We are sorry for the inconvenience."}.to_json, status: :ok, content_type: "application/json"
      end
    end
  end

  def description_only
    @job = Job.find_by(id: params[:id]) || Job.find_by(aid: params[:id])
    render 'errors/job_unavailable' if !@job
  end

  def apply
    @job = Job.find_by(id: params[:id])
  end

  private
  def job_params
    params.require(:job).permit(
      :specialty,
      :city,
      :state,
      :job_description,
      :subspecialty_keywords,
      :visas,
      :distance_to_metro,
      :contact_email,
      :contact_name,
    )
  end

  def user_is_poster?
    unless user_signed_in?
      flash[:notice] = "Please sign in to post a job."
      redirect_to new_user_session_path and return
    end
    if current_user.account_type != "poster"
      flash[:notice] = "Please change account type to Post Jobs if you'd like to post jobs, or create a new account."
      redirect_to edit_user_registration_path and return
    end
  end
  
end