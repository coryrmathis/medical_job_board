class AddDistanceToMetroToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :distance_to_metro, :string
  end
end
