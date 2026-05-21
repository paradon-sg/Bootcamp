# frozen_string_literal: true

class Api::SessionsController < ApplicationController
  skip_before_action :authenticate!, only: %i[create]

  def create
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      render json: login_response(user), status: :created
    else
      render json: { error: 'Invalid email or password' }, status: :unauthorized
    end
  end

  def destroy
    if current_user.update!(refresh_token: SecureRandom.hex(32))
      render json: { message: 'Logged out successfully' }, status: :ok
    else
      render json: { error: 'Failed to log out' }, status: :unprocessable_entity
    end
  end

  private

  def login_response(user)
    {
      user: user.attributes.except('password_digest', 'refresh_token'),
      token: user.generate_token_for(:refresh_token)
    }
  end
end
