class SynchronizePositionsJob
  include Sidekiq::Worker

  attr_reader :s3, :object, :import_ids 

  def initialize
    @s3 = configure_s3
    @import_ids = []
  end

  def perform(source = 'archway')
    @source = source
    case @source
    when 'archway'
      @object = "job_board/active_positions.csv"
    when 'summit'
      @object = "job_board/summit_active_positions.csv"
    end
    file = download_import_file
    synchronize(file)
  end

  def synchronize(file)
    SmarterCSV.process(file, smarter_csv_options) do |chunk|
      chunk.each do |position_data|
        import_ids << position_data[:id]
        JobImporter.new(position_data, @source).import
      end
    end
    destroy_inactive_jobs
  end

  def destroy_inactive_jobs
    case @source
    when 'archway'
      destroy_archway_inactive_jobs
    when 'summit'
      destroy_summit_inactive_jobs
    end
  end

  def destroy_archway_inactive_jobs
    # Generate an array of the aids of archway jobs currenty in database
    archway_ids = Job.archway.pluck(:aid)
    # Filter out ids of jobs which were present in the import list
    to_delete_ids = archway_ids.reject{|id| import_ids.include?(id)}
    # Delete the jobs which weren't present in the import list (They're now inactive in the CRM)
    Job.where(aid: to_delete_ids).destroy_all
  end

  def destroy_summit_inactive_jobs
    # Generate an array of the sids of summit jobs currenty in database
    summit_ids = Job.summit.pluck(:sid)
    # Filter out ids of jobs which were present in the import list
    to_delete_ids = summit_ids.reject{|id| import_ids.include?(id)}
    # Delete the jobs which weren't present in the import list (They're now inactive in the CRM)
    Job.where(sid: to_delete_ids).destroy_all
  end

  def download_import_file
    FileUtils.mkdir_p(path)
    s3.get_object({ bucket: ENV["ARCHWAY_S3_BUCKET"], key: object }, target: target)
    target
  end

  def path
    Rails.root.join("tmp", "s3", "imports")
  end

  def target
    case @source
    when 'archway'
      path.join("active_jobs.csv")
    when 'summit'
      path.join("summit_active_jobs.csv")
    end
  end

  private

  def smarter_csv_options
    {
      chunk_size: 1000,
      force_utf8: true,
      invalid_byte_sequence: ""
    }
  end

  def configure_s3
    Aws.config.update({
      region: ENV['S3_REGION'],
      credentials: Aws::Credentials.new(ENV['S3_ACCESS_KEY'], ENV['S3_SECRET_KEY'])
    })

    Aws::S3::Client.new
  end
end 