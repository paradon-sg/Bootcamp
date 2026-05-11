# frozen_string_literal: true

class Publisher < ApplicationRecord
  has_many :books, dependent: :destroy

  validates :name,    presence: true
  validates :email,   presence: true
  validates :phone,   presence: true
  validates :address, presence: true

  validates :name,  uniqueness: { case_sensitive: false, scope: :phone, message: 'and phone combination must be unique' }
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: { case_sensitive: false }
  validates :phone, format: { with: /\A\+?[0-9]{10}\z/, message: 'must be a valid phone number' }
end
