class AddSubspecialtyKeywordsToJobs < ActiveRecord::Migration[5.1]
  def change
    add_column :jobs, :subspecialty_keywords, :string
  end
end
