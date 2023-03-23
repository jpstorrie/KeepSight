class Photo < ApplicationRecord
  belongs_to :child
  has_one_attached :photo
end
