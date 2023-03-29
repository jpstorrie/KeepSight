class VideoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :notes, :milestone, :video, :created_at
  has_one :child

  def video
    rails_blob_path(object.video, only_path: true) if object.video.attached?
  end
end
