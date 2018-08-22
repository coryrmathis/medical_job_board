class JobsController < ApplicationController
  layout "no_links_in_header", only: [:description_only]

  def new
    unless user_signed_in?
      redirect_to new_user_session_path and return
    end
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
    if request.xhr?
      #Handle AJAX
      render json: { 
        error: flash[:error],
        content: render_to_string(partial: 'job_panel', locals: {job: @job}, layout: false)
        # content: ActionController::Base.helpers.sanitize(
        #   render_to_string(partial: 'job_panel', locals: {job: @job}, layout: false),
        #   tags: %w(strong em a div h1 button ul li p hr),
        #   attributes: %w(href class id data-toggle data-target)
        # )
      }
    else 
      render 'errors/job_unavailable' if !@job
    end
  end

  def description_only
  
    @job = Job.find_by(id: params[:id]) || Job.find_by(aid: params[:id])
    render 'errors/job_unavailable' if !@job
  end
  
end