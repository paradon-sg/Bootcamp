# frozen_string_literal: true

Rails.application.routes.draw do
  namespace :api, defaults: { format: :json } do
    resources :sessions, only: [] do
      collection do
        post   :create
        delete :destroy
      end
    end

    namespace :v1 do
      resources :authors
      resources :books
      resources :categories
      resources :publishers
    end
  end

  get 'up' => 'rails/health#show', as: :rails_health_check

  root to: proc { [200, {}, ['']] }
end
