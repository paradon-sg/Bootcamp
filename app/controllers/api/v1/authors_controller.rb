# frozen_string_literal: true

class Api::V1::AuthorsController < ApplicationController
  before_action :set_author, only: %i[show update destroy]

  def index
    @authors = Author.all

    render json: paginate(@authors), status: :ok
  end

  def show
    render json: @author, status: :ok
  end

  def create
    @author = Author.new(author_params)

    if @author.save
      render json: @author, status: :created
    else
      render json: { message: @author.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @author.update(author_params)
      render json: @author, status: :ok
    else
      render json: { message: @author.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @author.destroy
      render json: { message: 'Author deleted successfully' }, status: :ok
    else
      render json: { message: @author.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_author
    @author = Author.find(params[:id])
  end

  def author_params
    params.require(:author).permit(:name, :email, :phone)
  end
end
