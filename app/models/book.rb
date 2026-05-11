# frozen_string_literal: true

class Book < ApplicationRecord
  belongs_to :publisher
  belongs_to :category

  has_many :book_authors, dependent: :destroy
  has_many :authors,      through: :book_authors

  validates :title,  presence: true
  validates :price,  presence: true

  validates :price,  numericality: { greater_than_or_equal_to: 0 }
end
