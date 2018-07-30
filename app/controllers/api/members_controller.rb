class Api::MembersController < ApplicationController

  def index
    @members = Member.all
    render "index.json.jbuilder"
  end

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

  def destroy
    @member = Member.find(params[:id])
    @member.destroy

    render json: {message: "No longer a member"}

  end

end
