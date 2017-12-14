class Jobs::Search

  def self.start(args)
    args = args.reject{ |k,v| v.blank?}
    query_string = args.keys.map { |key| "lower(#{key.to_s}) LIKE ?"}.join(" AND ")
    search_values = args.values.map{ |value| "%#{value.downcase}%"}
    Job.where(query_string, *search_values).order(:state)
  end


end