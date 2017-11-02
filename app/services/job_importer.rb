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
    failed_specialty = job_data.delete(:failed_specialty)
    if job 
      job.update(job_data)
    else
      job = Job.create(job_data)
    end
    puts failed_specialty if job.errors && failed_specialty
  end

  private

  def handle_data(data)
    data = set_aid(data)
    data = set_specialty(data)
    data = set_subspecialty_keywords(data)
    return data
  end

  def set_aid(data)
    data[:aid] = data.delete(:id)
    return data
  end

  def set_specialty(data)
    specialty = Specialty.find_by(alias: data[:specialty]) || Specialty.find_by(name: data[:specialty])
    if specialty 
      data[:specialty] = specialty.name
    else
      data[:failed_specialty] = data[:specialty]
      data[:specialty] = nil
    end
    return data
  end

  def set_subspecialty_keywords(data)
    data[:subspecialty_keywords] = data.delete(:job_title)
    return data
  end

  
end