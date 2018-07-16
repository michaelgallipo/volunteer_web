class Api::OrganizationsController < ApplicationController

  def index
    @organizations = Organization.all
    render "index.json.jbuilder"

  end

  def show
    org_id = params[:id]
    @organization = Organization.find(org_id)

    render "show.json.jbuilder"

  end

  def create

    @organization = Organization.create(
      name: params[:name],
      address: params[:address],
      website: params[:website],
      logo: params[:logo],
      contact_name: params[:contact_name],
      contact_email: params[:contact_email],
      contact_phone: params[:contact_phone],
      mission: params[:mission],
      description: params[:description],
      category_id: params[:category_id],
      needs: params[:needs]
      )

    if @organization.save
      render "show.json.jbuilder"
    else
      render json: {errors: @organization.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def update

    @organization = Organization.find(params[:id])
      @organization.name = params[:name] || @organization.name
      @organization.address = params[:address] || @organization.address
      @organization.website = params[:website] || @organization.website
      @organization.logo = params[:logo] || @organization.logo
      @organization.contact_name = params[:contact_name] || @organization.contact_name
      @organization.contact_email = params[:contact_email] || @organization.contact_email
      @organization.contact_phone = params[:contact_phone] || @organization.contact_phone
      @organization.mission = params[:mission] || @organization.mission
      @organization.description = params[:description] || @organization.description
      @organization.category_id = params[:category_id] || @organization.category_id
      @organization.needs = params[:needs] || @organization.needs

    if @organization.save
      render "show.json.jbuilder"
    else
      render json: {errors: @organization.errors.full_messages}, status: :unprocessable_entity
    end

  end

  def destroy

    @organization = Organization.find(params[:id])    
    @organization.destroy

    render json: {message: "Organization successfully deleted"}

  end

end
