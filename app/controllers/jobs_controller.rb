class JobsController < ApplicationController
  layout "no_links_in_header", only: [:description_only]

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

  def aid_description_only
    @job = Job.find_by(aid: params[:aid])
    if @job.present?
      render 'description_only'
    else
      render 'errors/job_unavailable'
    end
  end

  def sid_description_only
    @job = Job.find_by(sid: params[:sid])
    if @job.present?
      render 'description_only'
    else
      render 'errors/job_unavailable'
    end
  end

  def from_external_description_only
    case params[:source]
    when 'archway'
      @job = Job.find_by(aid: params[:external_id])
    when 'summit'
      @job = Job.find_by(sid: params[:external_id])
    end
    
    if @job.present?
      render 'description_only'
    else
      render 'errors/job_unavailable'
    end
  end
  
end