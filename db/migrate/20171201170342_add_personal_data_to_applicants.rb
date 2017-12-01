class AddPersonalDataToApplicants < ActiveRecord::Migration[5.1]
  def change

    add_column :applicants, :first_name, :string, null: false
    add_column :applicants, :last_name, :string, null: false
    add_column :applicants, :specialty, :string, null: false
    add_column :applicants, :location_preference, :string, null: false
  end
end
