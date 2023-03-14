class JournalSerializer < ActiveModel::Serializer
  attributes :id, :name, :journal, :milestone
  has_one :child
end
