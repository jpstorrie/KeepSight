class PhotoSerializer < ActiveModel::Serializer
  attributes :id, :name, :notes, :milestone
  has_one :child
end
