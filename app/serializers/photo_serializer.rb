class PhotoSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :notes, :milestone, :photo
  has_one :child

  def photo
    rails_blob_path(object.photo, only_path: true) if object.photo.attached?
  end
end
