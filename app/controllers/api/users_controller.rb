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

end
