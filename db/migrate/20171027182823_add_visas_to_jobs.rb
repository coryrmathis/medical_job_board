class AddVisasToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :visas, :string
  end
end
