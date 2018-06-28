class RenameUserOrganizationToMember < ActiveRecord::Migration[5.2]
  def change
    rename_table :user_organizations, :members
  end
end
