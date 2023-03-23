class Video < ApplicationRecord
  belongs_to :child
  has_one_attached :video
end
