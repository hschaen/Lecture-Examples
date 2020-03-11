class CreateHerbs < ActiveRecord::Migration[6.0]
  def change
    create_table :herbs do |t|
      t.string :nams
      t.boolean :is_watered

      t.timestamps
    end
  end
end
