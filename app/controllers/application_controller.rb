class ApplicationController < ActionController::Base
  serialization_scope :view_context
  protect_from_forgery with: :exception

  helper_method :current_user

  def current_user
    @current_user ||= User.find(session[:id]) if session[:id]
  end
end
