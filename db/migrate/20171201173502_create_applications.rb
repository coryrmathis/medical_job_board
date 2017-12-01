class CreateApplications < ActiveRecord::Migration[5.1]
  def change
    create_table :applications do |t|
      t.string :first_name, :string, null: false
      t.string :last_name, :string, null: false
      t.string :email, :string, null: false
      t.string :specialty, :string, null: false
      t.string :location_preference, :string, null: false
      t.string :cv, :string


      t.timestamps
    end
  end
end
