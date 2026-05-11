class CreatePublishers < ActiveRecord::Migration[8.1]
  def change
    create_table :publishers do |t|
      t.string :name,    null: false
      t.string :email,   null: false
      t.string :phone,   null: false
      t.string :address, null: false

      t.timestamps
    end

    add_index :publishers, 'LOWER(email)',       unique: true
    add_index :publishers, 'LOWER(name), phone', unique: true
end
end