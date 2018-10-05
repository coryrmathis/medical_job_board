class Api::V1::BaseController < ApplicationController
  protect_from_forgery with: :exception
  before_action :destroy_session
  rescue_from ActionController::InvalidAuthenticityToken, with: :not_authorized
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  def destroy_session
    request.session_options[:skip] = true
  end

  def not_found
    render json: {errors: 'Not found'}.to_json, status: 404
    # return api_error(status: 404, errors: 'Not found')
  end

  def not_authorized
    render json: {errors: 'Access denied, invalid CSRF token'}.to_json, status: 401
  end
end