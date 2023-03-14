class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :recieve_emails
end
