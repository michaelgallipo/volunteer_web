Rails.application.routes.draw do
  # STEP 1: A ROUTE triggers a controller action
  # verb "/urls" => "namespace/controllers#action"
  namespace :api do
    get "users" => "users#index"
    get "users/:id" => "users#show"
    post "users" => "users#create"

    get "organizations" => "organizations#index"
    get "organization/:id" => "organization#show" 

  end

end
