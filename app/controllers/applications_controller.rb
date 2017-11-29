class ApplicationsController < ApplicationController

  def poop
    render json: params.inspect
  end
end