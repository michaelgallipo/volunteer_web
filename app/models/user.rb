class User < ApplicationRecord

  has_many :members
  has_many :organizations, through: :members

end
