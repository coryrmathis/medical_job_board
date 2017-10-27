class JobImporter
  attr_reader :job_data

  def initialize(job_data)
    @job_data = handle_data(job_data)
  end

  def import
    find_job
  end

  def find_job
    job = Job.find_by(aid: job_data[:aid])

    if job 
      job.update(job_data)
      puts "updated"
    else
      Job.create(job_data)
      puts "created"
    end
  end

  private

  def handle_data(data)
    data = set_aid(data)
    data = set_subspecialty_keywords(data)
    return data
  end

  def set_subspecialty_keywords(data)
    data[:subspecialty_keywords] = data.delete(:job_title)
    return data
  end

  def set_aid(data)
    data[:aid] = data.delete(:id)
    return data
  end
end