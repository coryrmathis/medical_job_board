class AddVisaRequirementsToApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :applications, :visa_requirements, :string
  end
end
