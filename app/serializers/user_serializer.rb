class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :recieve_emails, 
  # :pfp

  def pfp
    # object.
  end
end
