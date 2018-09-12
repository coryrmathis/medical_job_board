class UsersController < ApplicationController

  def update
    if request.xhr?
      user = User.find(params[:id])
      # Save/unsave job via react job search
      if params[:job_id]
        puts "updating saved jobs"
        job = Job.find(params[:job_id])
        if user.jobs.include? job
          user.jobs.delete job
        else
          user.jobs << job
        end
      end
    end
  end

end