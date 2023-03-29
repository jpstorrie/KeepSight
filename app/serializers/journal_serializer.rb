class JournalSerializer < ActiveModel::Serializer
  attributes :id, :name, :journal, :milestone, :created_at
  has_one :child
end
