class Video < ApplicationRecord
  belongs_to :child
  has_onde_attached :video
end
