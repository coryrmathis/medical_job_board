module ReactBrowser::ReactHelper

  def rails_data
    {
      specialties: Specialty.pluck(:name).sort,
      states: CS.states(:us),
      user_id: current_user.id
    }

  end

end