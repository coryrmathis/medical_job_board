class RenameSavedJobs < ActiveRecord::Migration[5.1]
  def change
    rename_table :saved_jobs, :job_saves
  end
end
