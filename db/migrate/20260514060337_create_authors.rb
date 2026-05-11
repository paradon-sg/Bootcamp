class CreateAuthors < ActiveRecord::Migration[8.1]
  def change
    create_table :authors do |t|
      t.string :name,  null: false
      t.string :email, null: false
      t.string :phone, null: false

      t.timestamps
    end

    add_index :authors, 'LOWER(email)', unique: true
    add_index :authors, :phone,         unique: true
  end
end