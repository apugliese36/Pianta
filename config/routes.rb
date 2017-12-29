Rails.application.routes.draw do
  root "sign_in#index"

  namespace :api do
    namespace :v1 do
      resources :snapshots, only: [:index, :show, :create, :destroy]
      resources :plants, only: [:index, :show, :create, :destroy]
    end
  end

  resources :static_pages, only: [:index]

  get 'auth/:provider/callback', to: 'sessions#create'
  get 'logout', to: 'sessions#destroy'
  get '/*all', to: 'sign_in#index'
end
