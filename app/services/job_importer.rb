class JobImporter
  attr_reader :job_data

  def initialize(job_data, source = 'archway')
    @source = source
    @job_data = handle_data(job_data)
  end

  def import
    find_job
  end

  def find_job
    case @source
    when 'archway'
      find_archway_job
    when 'summit'
      find_summit_job
    end
  end

  def find_archway_job
    job = Job.find_by(aid: job_data[:aid])
    failed_specialty = job_data.delete(:failed_specialty)
    if job 
      job.update(job_data)
    else
      job = Job.create(job_data)
    end
  end

  def find_summit_job
    job = Job.find_by(sid: job_data[:sid])
    failed_specialty = job_data.delete(:failed_specialty)
    if job 
      job.update(job_data)
    else
      job = Job.create(job_data)
    end
  end

  private

  def handle_data(data)
    data = set_external_id(data)
    data = set_specialty(data)
    data = set_subspecialty_keywords(data)
    data = set_contact_email(data)
    data = set_contact_name(data)
    return data
  end

  def set_external_id(data)
    case @source
    when 'archway'
      data = set_aid(data)
    when 'summit'
      data = set_sid(data)
    end
  end

  def set_aid(data)
    data[:aid] = data.delete(:id)
    return data
  end

  def set_sid(data)
    data[:sid] = data.delete(:id)
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

  def set_contact_email(data)
    data[:contact_email] = data.delete(:recruiter_email)
    return data
  end

  def set_contact_name(data)
    data[:contact_name] = data.delete(:recruiter_name)
    return data
  end

  
end