# frozen_string_literal: true

class User < ApplicationRecord
  has_secure_password

  normalizes :email, with: ->(e) { e.strip.downcase }

  generates_token_for :refresh_token do
    refresh_token
  end

  before_validation :generate_refresh_token, on: :create

  private

  def generate_refresh_token
    self.refresh_token = SecureRandom.hex(32)
  end
end
