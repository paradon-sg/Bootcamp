# frozen_string_literal: true

module PaginationHelper
  extend ActiveSupport::Concern

  def paginate(scope)
    page      = params[:page].to_i.positive? ? params[:page].to_i : 1
    per_page  = params[:per_page].to_i.positive? ? params[:per_page].to_i : 10
    paginated = scope.page(page).per(per_page)

    {
      data: paginated,
      pagination: {
        size: paginated.total_count,
        total_pages: paginated.total_pages,
        per_page: paginated.limit_value,
        page: paginated.current_page
      }
    }
  end
end
