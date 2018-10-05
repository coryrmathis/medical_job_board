class Api::V1::ApplicantsController < Api::V1::BaseController
  
  before_action :validate_applicant
  attr_accessor :valid_applicant
  
  def show
    render json: valid_applicant.to_json
  end

  def applied_jobs
    render json: valid_applicant.applied_jobs.order("state desc, city, id").page(params[:page]).to_json
  end

  def saved_jobs
    render json: valid_applicant.saved_jobs.order("state desc, city, id").page(params[:page]).to_json
  end

  def saved_jobs_ids
    render json: valid_applicant.saved_jobs.pluck(:id).uniq.to_json
  end

  def update_saved_jobs
    if params[:job_id]
      puts "updating saved jobs"
      job = Job.find(params[:job_id])
      if valid_applicant.saved_jobs.include? job
        valid_applicant.saved_jobs.delete job
      else
        valid_applicant.saved_jobs << job
      end
      head 200, content_type: 'text/html'
      return
    end
    render json: {response: 'Bad request, no job_id included'}, status: 400
  end

  private
  def validate_applicant
    user = User.find(params[:id])
    unless user && user.applicant?
      not_found
    end
    self.valid_applicant = user
  end

end