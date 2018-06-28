class Api::OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render "index.json.jbuilder"

  end


end
