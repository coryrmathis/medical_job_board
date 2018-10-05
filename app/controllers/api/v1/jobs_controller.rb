class Api::V1::JobsController < Api::V1::BaseController

  def index
    page = params[:page] || 1
    if params[:job]
      jobs = Job.search(params[:job]).order("state desc, city, id").page(page)
    else
      jobs = Job.all.order("state desc, city, id").page(page)
    end
    render json: jobs.to_json
  end

  def show
    job = Job.find(params[:id])
    if job
      render json: job.to_json
    end
  end

  def markup
    job = Job.find(params[:id])
    if job
      render json: job.job_description_markup.to_json
    end
  end

  def interested_users_ids
    job = Job.find(params[:id])
    if job
      render json: job.interested_users.pluck(:id).uniq.to_json
    end
  end

  def applicants_ids
    job = Job.find(params[:id])
    if job
      render json: job.applicants.pluck(:id).uniq.to_json
    end
  end


end