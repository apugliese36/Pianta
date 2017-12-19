Rails.application.routes.draw do
  root "sign_in#index"

  namespace :api do
    namespace :v1 do
      resources :gardens, only: [:index, :show, :create, :destroy]
    end
  end

  resources :static_pages, only: [:index]

end
