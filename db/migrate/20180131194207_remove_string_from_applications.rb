class RemoveStringFromApplications < ActiveRecord::Migration[5.1]
  def change
    remove_column :applications, :string
  end
end
