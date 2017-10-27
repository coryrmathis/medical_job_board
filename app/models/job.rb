class Job < ApplicationRecord

  scope :archway, ->{where.not(aid: nil)}

  def self.search(args)
    args = args.reject{ |k,v| v.blank?}
    query_string = args.keys.map { |key| "lower(#{key.to_s}) LIKE ?"}.join(" AND ")
    search_values = args.values.map{ |value| "#{value.downcase}%"}
    where(query_string, *search_values)
  end

  def job_description_markup
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(job_description).html_safe
  end
end
