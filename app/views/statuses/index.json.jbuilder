json.array! @statuses do |status|
  json.extract! status, :id, :name
end
