if Rails.env === 'production'
  Rails.application.config.session_store :cookie_store, key: '_mapchat', domain: 'name-of-you-app-json-api'
else
  Rails.application.config.session_store :cookie_store, key: '_mapchat', expire_after: 12.hours

end
