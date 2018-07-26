class Api::MembersController < ApplicationController

  def create
    @member = Member.create(
      user_id: current_user.id,
      organization_id: params[:organization_id]
      )

    if @member.save
      render json: ["Successfully Joined"]
    else
      render json: ["Fail"]
    end

  end

end
