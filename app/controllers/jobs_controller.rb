class JobsController < ApplicationController
  layout "no_links_in_header", only: [:description_only]
  before_action :validate_user, only: [:react_browser]
  before_action :validate_poster, only: [:new, :create, :edit, :update, :destroy]

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
    if params[:sort]
      @jobs = Job.search(params[:job]).reorder(params[:sort]).page(params[:page])
    else
      @jobs = Job.search(params[:job]).page(params[:page])
    end

    if request.xhr?
      render "index", layout: false
    end
  end

  def show
    @job = Job.find_by(id: params[:id]) || Job.find_by(aid: params[:id])
    render 'errors/job_unavailable' if !@job
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

  def validate_user
    unless user_signed_in?
      flash[:notice] = "Please sign in"
      redirect_to new_user_session_path and return
    end
  end

  def validate_poster
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