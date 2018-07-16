class Organization < ApplicationRecord

  belongs_to :category

  has_many :members
  has_many :users, through: :members

  validates :name, :website, :contact_name, :category_id, presence: true
  validates :name, uniqueness: true

end
