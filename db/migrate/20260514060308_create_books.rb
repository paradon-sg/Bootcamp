class CreateBooks < ActiveRecord::Migration[8.1]
  def change
    create_table :books do |t|
      t.string  :title, null: false
      t.decimal :price, null: false, precision: 10, scale: 2

      t.references :publisher, null: false, foreign_key: true
      t.references :category,  null: false, foreign_key: true

      t.timestamps
    end
  end
end