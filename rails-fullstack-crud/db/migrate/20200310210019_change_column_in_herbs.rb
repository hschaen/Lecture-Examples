class ChangeColumnInHerbs < ActiveRecord::Migration[6.0]
  def change
    change_column :herbs, :is_watered, :string
  end
end
