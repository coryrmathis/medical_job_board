module ReactBrowser::ReactHelper

  def rails_data
    {
      specialties: Specialty.pluck(:name).sort,
      states: CS.states(:us),
      user_id: user_signed_in? ? current_user.id : nil,
      user_account_type: user_signed_in? ? current_user.account_type.to_json : nil,
    }

  end

end