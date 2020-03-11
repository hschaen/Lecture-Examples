class ChangeColumnName < ActiveRecord::Migration[6.0]
  def change
    rename_column :herbs, :nams, :name
  end
end
