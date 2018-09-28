require 'sidekiq/web'
require 'sidekiq/cron/web'
Rails.application.routes.draw do
  devise_for :users, controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount Sidekiq::Web => '/sidekiq'

  get "/cities/:state", to: "misc#cities"
  get "/jobs/:id/description", to: "jobs#description_only"
  get '/jobs/new', to: 'jobs#new'
  resources :jobs, only: [:show, :index]
  get '/jobs/dev/react_browser', to: 'jobs#react_browser'
  get '/users/:id/saved_jobs', to: 'users#saved_jobs', as: 'saved_jobs'

  resources :applications, only: [:create]

  # Main Routes
  root "main#index"
end
