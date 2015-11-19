Rails.application.routes.draw do
  root 'top#index'

  namespace :api do
    resources :tasks, only: [ :index, :create, :update, :destroy ] do
      patch :move_higher, :move_lower, on: :member
    end
  end
end
