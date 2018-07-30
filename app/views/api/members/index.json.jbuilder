json.array! @members.each do |member|
  json.id member.id
  json.user_id member.user_id
  json.organization_id member.organization_id
end