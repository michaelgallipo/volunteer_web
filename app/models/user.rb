class User < ApplicationRecord

  has_secure_password

  has_many :members
  has_many :organizations, through: :members

  validates :full_name, :user_name, :email, presence: true
  validates :user_name, uniqueness: true, length: {minimum: 6}


  def member_of
    organizations
      #organization.name

  end


end
