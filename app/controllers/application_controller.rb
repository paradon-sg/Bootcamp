# frozen_string_literal: true

class ApplicationController < ActionController::API
  include PaginationHelper

  before_action :authenticate!

  private

  attr_reader :current_user

  def authenticate!
    @current_user = User.find_by_token_for(:refresh_token, bearer_token)

    return if current_user.present?

    render_unauthorized
  end

  def bearer_token
    request.headers['Authorization']&.split&.last
  end

  def render_unauthorized
    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
