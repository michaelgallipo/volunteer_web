Rails.application.routes.draw do
  post 'user_token' => 'user_token#create'
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"
  namespace :api do
    get "users" => "users#index"
    get "users/:id" => "users#show"
    post "users" => "users#create"
    patch "users/:id" => "users#update"
    delete "users/:id" => "users#destroy"

    get "organizations" => "organizations#index"
    get "organizations/:id" => "organizations#show" 
    post "organizations" => "organizations#create"
    patch "organizations/:id" => "organizations#update"
    delete "organizations/:id" => "organizations#destroy"

    get "categories" => "categories#index"

    post "members" => "members#create"

  end

end
