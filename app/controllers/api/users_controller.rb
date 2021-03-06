class Api::UsersController < ApplicationController

  def index
    @users = User.all

    if params[:search]
      @users = User.where("lower(skills) LIKE ? AND visibility = ?", "%#{params[:search].downcase}%", true)
    end

    render "index.json.jbuilder"

  end

  def show

    if current_user

      if params[:id] == "me"
        @user = User.find(current_user.id)
      else 
        @user = User.find(params[:id])
      end  
      render "show.json.jbuilder"
    else
      render json: ["fail"]
    end

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
      visibility: params[:visibility],
      bio: params[:bio],
      skills: params[:skills]
      )

    if @user.save
      render "show.json.jbuilder"
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def update
    if current_user.id = params[:id]
      @user = User.find(current_user.id) 
      @user.full_name = params[:full_name] || @user.name
      @user.user_name = params[:user_name] || @user.user_name
      @user.password = params[:password] || @user.password
      @user.password_confirmation = params[:password_confirmation] || @user.password_confirmation
      @user.address = params[:address] || @user.address
      @user.email = params[:email] || @user.email
      @user.phone = params[:phone] || @user.phone
      @user.visibility = params[:visibility] || @user.visibility
      @user.bio = params[:bio] || @user.bio
      @user.skills = params[:skills] || @user.skills
    else
      render json: ["Fail"]
    end

    if @user.save
      render "show.json.jbuilder"
    else
      render json: {errors: @user.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def destroy

    @user = User.find(params[:id])
    @user.destroy

    render json: {message: "User account succesfully deleted"}

  end

end
