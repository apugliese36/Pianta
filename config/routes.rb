Rails.application.routes.draw do
  root "static_pages#index"

  namespace :api do
    namespace :v1 do
      resources :gardens, only: [:index, :show, :create, :destroy]
    end
  end
  
end
