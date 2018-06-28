class CreateOrganizations < ActiveRecord::Migration[5.2]
  def change
    create_table :organizations do |t|
      t.string :name
      t.string :address
      t.string :website
      t.string :logo
      t.string :contact_name
      t.string :contact_email
      t.string :contact_phone
      t.text :mission
      t.text :description
      t.integer :category_id
      t.text :needs

      t.timestamps
    end
  end
end
