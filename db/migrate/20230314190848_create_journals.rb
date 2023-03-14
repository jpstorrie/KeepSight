class CreateJournals < ActiveRecord::Migration[7.0]
  def change
    create_table :journals do |t|
      t.string :name
      t.string :journal
      t.string :milestone
      t.belongs_to :child, null: false, foreign_key: true

      t.timestamps
    end
  end
end
