require 'sidekiq/web'
require 'sidekiq/cron/web'
Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount Sidekiq::Web => '/sidekiq'

  get "/cities/:state", to: "misc#cities"
  get "/jobs/by_aid/:aid/description", to: "jobs#aid_description_only"
  get "/jobs/by_sid/:sid/description", to: "jobs#sid_description_only"
  get "/jobs/from_external/:source/:external_id/description", to: "jobs#from_external_description_only"

  get "/jobs/:id/description", to: "jobs#description_only"
  resources :jobs, only: [:show, :index]

  resources :applications, only: [:create]

  # Main Routes
  root "main#index"
end
