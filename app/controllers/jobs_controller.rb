class JobsController < ApplicationController


  def index
    render json: params
  end


  def show
    # actual_id = params[:id] / 10
    response = RestClient.get("https://archwaycrm.herokuapp.com/api/positions/#{params[:id]}")
  rescue RestClient::NotFound => e 
    render 'errors/job_unavailable'
  else
    @job = Job.new(JSON.parse(response.body))

  end
end