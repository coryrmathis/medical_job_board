class CreateJobs < ActiveRecord::Migration[5.1]
  def change
    create_table :jobs do |t|

      t.string :specialty
      t.string :city
      t.string :state
      t.text :job_description
      t.integer :aid


      t.timestamps
    end
  end
end
