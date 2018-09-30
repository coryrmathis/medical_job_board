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
  resources :jobs
  get '/jobs/dev/react_browser', to: 'jobs#react_browser'
  get '/jobs/:id/apply', to: 'jobs#apply'
  put '/users/:id/saved_jobs', to: 'users#update_saved_jobs'
  get '/users/:id/saved_jobs', to: 'users#saved_jobs', as: 'saved_jobs'
  get '/users/:id/posted_jobs', to: 'users#posted_jobs', as: "posted_jobs"
  get '/users/:id/applications', to: 'users#applications', as: 'applications'
  resources :applications, only: [:create, :index]

  # React-to-rails api
  get "/api/react/method/", to: 'api/react#method_call'

  # Main Routes
  root "main#index"
end
