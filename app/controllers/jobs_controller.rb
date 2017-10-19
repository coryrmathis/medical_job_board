class JobsController < ApplicationController

  def show
    # actual_id = params[:id] / 10
    response = RestClient.get("https://archwaycrm.herokuapp.com/api/positions/#{params[:id]}")
  rescue RestClient::NotFound => e 
    render 'errors/job_unavailable'
  else
    @job = PlaceholderJob.new(JSON.parse(response.body))

  end
end