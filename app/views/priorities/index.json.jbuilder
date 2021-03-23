json.array! @priorities do |priority|
  json.extract! priority, :id, :name
end
