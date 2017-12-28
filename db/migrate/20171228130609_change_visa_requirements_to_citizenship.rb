class ChangeVisaRequirementsToCitizenship < ActiveRecord::Migration[5.1]
  def change
    rename_column :applications, :visa_requirements, :citizenship
  end
end
