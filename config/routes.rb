Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  post '/login',    to: 'sessions#create'
  post '/logout',   to: 'sessions#destroy'
  get '/logged_in', to: 'sessions#is_logged_in?'

  # post '/users',         to: 'users#create' above can also look like this
  # get '/users/:user_id', to: 'users#show'
  # get '/users',          to: 'users#index'
  #
  resources :users, only: [:create, :show, :index], format: "json"
  resources :tasks, only: [:create, :show, :update, :index], format: "json"
  resources :projects, only: [:create, :show, :update, :index], format: "json"
  resources :priorities, only: [:create, :show, :update, :index], format: "json"
  resources :statuses, only: [:create, :show, :update, :index], format: "json"
  resources :messages, only: [:create, :show, :update, :index], format: "json"


end
