class Child < ApplicationRecord
  belongs_to :user

  has_many :journals
  has_many :photos
  has_many :videos

  has_one_attached :pfp

end
