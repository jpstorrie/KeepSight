class Child < ApplicationRecord
  belongs_to :user

  has_many :journals, dependent: :destroy
  has_many :photos, dependent: :destroy
  has_many :videos, dependent: :destroy

  has_one_attached :pfp

end
