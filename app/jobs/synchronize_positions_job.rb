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

    SmarterCSV.process(file, options) do |chunk|
      chunk.each do |job|
        # Any Job that isn't present in the list but is in the db must be detected and deleted
        # Find Job by aid/id
        # Update if found/Create if not
      end
    end
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