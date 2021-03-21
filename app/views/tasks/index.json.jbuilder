
json.array! @tasks do |task|
  json.extract! task, :id, :name, :description
  json.full_name "#{task.project.prefix}-#{task.name}"
  json.priority task.priority.name
  json.status task.status.name
end
