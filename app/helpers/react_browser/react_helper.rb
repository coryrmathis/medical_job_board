module ReactBrowser::ReactHelper

  def rails_data
    {
      specialties: Specialty.pluck(:name).sort,
      states: CS.states(:us),
      user_id: current_user.id,
      user_account_type: current_user.account_type.to_json,
    }

  end

end