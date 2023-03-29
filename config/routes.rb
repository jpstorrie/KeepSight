Rails.application.routes.draw do
  resources :journals
  resources :photos
  resources :videos
  resources :children
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  get '/authorized', to: 'users#show'

  get '/hello', to: 'application#hello_world'

  get 'videos/download/:id', to: 'videos#download_video'

  get 'photos/download/:id', to: 'photos#download_photo'

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
