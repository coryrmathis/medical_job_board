class AddPhoneNumberToApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :applications, :phone_number, :string
  end
end
