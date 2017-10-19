class Job < ApplicationRecord

  scope :archway, ->{where.not(aid: nil)}

  def job_description_markup
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(job_description).html_safe
  end
end
