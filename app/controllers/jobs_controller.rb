class JobsController < ApplicationController


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
  
end