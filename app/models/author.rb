# frozen_string_literal: true

class Author < ApplicationRecord
  PHONE_FORMAT = /\A\+?[0-9]{10,15}\z/

  has_many :book_authors, dependent: :destroy
  has_many :books,        through: :book_authors

  validates :name,  presence: true
  validates :email, presence: true
  validates :phone, presence: true

  validates :email, uniqueness: { case_sensitive: false }, format: { with: URI::MailTo::EMAIL_REGEXP }
  validates :phone, uniqueness: true, format: { with: PHONE_FORMAT, message: 'must be a valid phone number' }
end
