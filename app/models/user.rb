class User < ApplicationRecord
    has_secure_password
    has_one_attached :pfp

    has_many :children
    has_many :journals, through: :children
    has_many :photos, through: :children
    has_many :videos, through: :children

    validates :username, presence: true, uniqueness: true
    validates :email, presence: true, uniqueness: true
    validates :password, length: { in: 6..20 }
    validates :password, presence: true
end
