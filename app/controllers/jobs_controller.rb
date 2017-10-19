class JobsController < ApplicationController


  def index
    render json: params
  end


  def show
  
    @job = Job.find_by(id: params[:id]) || Job.find_by(aid: params[:id])
    render 'errors/job_unavailable' if !@job
  end
  
end