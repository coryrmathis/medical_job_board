class JobImporter
  attr_reader :job_data

  def initialize(job_data)
    @job_data = set_aid(job_data)
  end

  def import
    find_job
  end

  def find_job
    job = Job.find_by(aid: job_data[:aid])

    if job 
      job.update(job_data)
    else
      Job.create(job_data)
    end
  end

  private

  def set_aid(data)
    data[:aid] = data.delete(:id)
    return data
  end
end