class AddContactEmailToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :contact_email, :string
  end
end
