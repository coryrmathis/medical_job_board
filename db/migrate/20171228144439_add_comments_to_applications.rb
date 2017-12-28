class AddCommentsToApplications < ActiveRecord::Migration[5.1]
  def change
    add_column :applications, :comments, :text
  end
end
