json.partial! @user, partial: 'user', as: :user

json.membership do
  json.member_of @user.member_of
end