class UserSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  attributes :id, :username, :email, :recieve_emails, :pfp
  def pfp
    rails_blob_path(object.pfp, only_path: true) if object.pfp.attached?
  end

end
