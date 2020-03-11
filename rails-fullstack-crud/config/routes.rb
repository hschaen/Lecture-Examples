Rails.application.routes.draw do
  get "herbs" => "herb#index", as: "all_herbs"
  get "herb/new" => "herb#new", as: "new_herb"
  get "herb/:id" => "herb#show", as: "herb"
  post "herbs" => "herb#create"
  delete "herb/:id" => "herb#delete", as: "delete_herb"
end
