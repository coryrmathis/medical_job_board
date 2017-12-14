class Job < ApplicationRecord
  has_many :applications

  validates :specialty, presence: true

  scope :archway, ->{ where.not(aid: nil) }

  def self.search(args)
    Jobs::Search.start(args)
  end

  def job_description_markup
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(job_description).html_safe
  end
end
