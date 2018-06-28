class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :user_name
      t.string :password_digest
      t.string :address
      t.string :email
      t.string :phone
      t.boolean :visibility
      t.text :bio
      t.string :skills

      t.timestamps
    end
  end
end
