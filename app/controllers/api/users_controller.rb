class Api::UsersController < ApplicationController

  def index
    @users = User.all
    render "index.json.jbuilder"

  end

  def show

    user_id = params[:id]
    @user = User.find(user_id)

    render "show.json.jbuilder"

  end

  def create

    @user = User.create(
      full_name: params[:full_name],
      user_name: params[:user_name],
      password: params[:password],
      password_confirmation: params[:password_confirmation],
      address: params[:address],
      email: params[:email],
      phone: params[:phone],
      bio: params[:bio],
      skills: params[:skills]
      )

    if @user.save
      render "show.json.jbuilder"
    else
      render json: {}
    end

  end

end
