class JobBrowserBuilder
  def table_data(jobs)
    jobs_table_data = []
    jobs.each do |job|
      jobs_table_data << {
        "id": job.id,
        "specialty": job.specialty,
        "city": job.city,
        "state": job.state,
        "visas": job.visas,
        "distance_to_metro": job.distance_to_metro,
        "subspecialty_keywords": job.subspecialty_keywords
      }
    end
    jobs_table_data
  end
end