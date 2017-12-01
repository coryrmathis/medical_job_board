class AddCVToApplicants < ActiveRecord::Migration[5.1]
  def change
    add_column :applicants, :cv, :string
  end
end
