module ReactBrowser::ReactHelper

  def rails_data
    {
      specialties: Specialty.pluck(:name).sort,
      states: CS.states(:us),
      userAccountType: current_user.account_type,
    }

  end

end