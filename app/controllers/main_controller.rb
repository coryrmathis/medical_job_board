class MainController < ApplicationController

  def index
    @specialties = Specialty.pluck(:name).sort
  end

  def contact
  end

  def about
  end
end