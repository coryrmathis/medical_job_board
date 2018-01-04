class AddContactNameToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :contact_name, :string
  end
end
