# frozen_string_literal: true

class Api::V1::BooksController < ApplicationController
  before_action :set_book, only: %i[show update destroy]
  before_action :set_books, only: %i[index]

  def index
    render json: paginate(@books), include: %i[authors publisher category], status: :ok
  end

  def show
    render json: @book, include: %i[authors publisher category], status: :ok
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      render json: @book, include: %i[authors publisher category], status: :created
    else
      render json: { message: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @book.update(book_params)
      render json: @book, include: %i[authors publisher category], status: :ok
    else
      render json: { message: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @book.destroy
      render json: { message: 'Book deleted successfully' }, status: :ok
    else
      render json: { message: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def set_books
    @books = Book.includes(:authors, :publisher, :category).all
  end

  def book_params
    params.require(:book).permit(:title, :price, :publisher_id, :category_id, author_ids: [])
  end
end
