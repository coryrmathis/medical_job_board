class AddColumnsToUsers < ActiveRecord::Migration[5.1]
  def change
    add_column :users, :first_name, :string
    add_column :users, :last_name_string, :string
    add_column :users, :account_type, :string
  end
end
