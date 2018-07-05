json.name organization.name
json.address organization.address
json.website organization.website
json.logo organization.logo
json.contact_name organization.contact_name
json.contact_email organization.contact_email
json.contact_phone organization.contact_phone
json.mission organization.mission
json.description organization.description
json.category_id organization.category_id
json.needs organization.needs

json.member do
  json.array! organization.users, partial: "api/users/user", as: :user
end
  