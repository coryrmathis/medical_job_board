class AddJobIdToApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :applications, :job_id, :integer
  end
end
