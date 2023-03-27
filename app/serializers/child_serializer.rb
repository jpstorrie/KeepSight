class ChildSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :name, :pfp
  has_one :user

  has_many :photos
  has_many :journals
  has_many :videos

  def pfp
    # Rails.application.routes.url_helpers.url_for(pfp) if pfp.attached?
    rails_blob_path(object.pfp, only_path: true) if object.pfp.attached?
  end
end
