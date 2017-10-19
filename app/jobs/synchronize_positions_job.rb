class SynchronizePositionsJob
  include Sidekiq::Worker

  attr_reader :s3, :object 

  def initialize
    @s3 = configure_s3
    @object = "job_board/active_positions.csv"
  end

  def perform
    file = download_import_file
    synchronize(file)
  end

  def synchronize(file)
    options = {
      chunk_size: 1000,
      force_utf8: true,
      invalid_byte_sequence: ""
    }
    # Set up container to collect ids being import (current active jobs)
    import_ids = []

    SmarterCSV.process(file, options) do |chunk|
      chunk.each do |position_data|
        # Any Job that isn't present in the list but is in the db must be detected and deleted
        # Find Job by aid/id
        # Update if found/Create if not
        import_ids << position_data[:id]
        JobImporter.new(position_data).import
      end
    end

    # Generate an array of the aids of archway jobs currenty in database
    archway_ids = Job.archway.pluck(:aid)
    # Filter out ids of jobs which were present in the import list
    delete_ids = archway_ids.reject{|id| import_ids.include?(id)}
    # Delete the jobs which weren't present in the import list (They're now inactive in the CRM)
  end

  def download_import_file
    FileUtils.mkdir_p(path)
    s3.get_object({ bucket: ENV["ARCHWAY_S3_BUCKET"], key: object }, target: path.join("active_jobs.csv"))
    path.join("active_jobs.csv")
  end

  def path
    Rails.root.join("tmp", "s3", "imports")
  end

  private

  def configure_s3
    Aws.config.update({
      region: ENV['ARCHWAY_S3_REGION'],
      credentials: Aws::Credentials.new(ENV['ARCHWAY_S3_ACCESS_KEY'], ENV['ARCHWAY_S3_SECRET_KEY'])
    })

    Aws::S3::Client.new
  end
end