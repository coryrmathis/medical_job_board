class GetActiveJobsJob
  include Sidekiq::Worker

  attr_reader :s3, :object 

  def initialize
    @s3 = configure_s3
    @object = "job_board/active_positions.csv"
  end

  def perform
    download_import_file
  end

  def download_import_file
    FileUtils.mkdir_p(path)
    s3.get_object({ bucket: ENV["ARCHWAY_S3_BUCKET"], key: object }, target: path.join("active_jobs.csv"))
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