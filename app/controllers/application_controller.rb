# frozen_string_literal: true

class ApplicationController < ActionController::API
  include PaginationHelper
  
  before_action :authenticated!

  API_KEY = ENV.fetch('API_KEY', 'api-key').freeze

  private

  def authenticated!
    return if ActiveSupport::SecurityUtils.secure_compare(request.headers['X-API-KEY'].to_s, API_KEY)

    render json: { error: 'Unauthorized' }, status: :unauthorized
  end
end
