# frozen_string_literal: true

class Api::V1::PublishersController < ApplicationController
  before_action :set_publisher, only: %i[show update destroy]

  def index
    @publishers = Publisher.all

    render json: paginate(@publishers), status: :ok
  end

  def show
    render json: @publisher, status: :ok
  end

  def create
    @publisher = Publisher.new(publisher_params)

    if @publisher.save
      render json: @publisher, status: :created
    else
      render json: { message: @publisher.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @publisher.update(publisher_params)
      render json: @publisher, status: :ok
    else
      render json: { message: @publisher.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @publisher.destroy
      render json: { message: 'Publisher deleted successfully' }, status: :ok
    else
      render json: { message: @publisher.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_publisher
    @publisher = Publisher.find(params[:id])
  end

  def publisher_params
    params.require(:publisher).permit(:name, :email, :phone, :address)
  end
end
