require 'redcarpet/render_strip'

class Job < ApplicationRecord
  has_many :applications
  belongs_to :creator, :class_name => 'User', :foreign_key => 'user_id'

  validates :specialty, presence: true

  default_scope { order(:state) }
  scope :specialty, ->(specialty){ where("lower(specialty) LIKE ?", "#{specialty.downcase}")}
  scope :state, ->(state){ where("lower(state) LIKE ?", state.downcase)}
  scope :city, ->(city){where("lower(city) LIKE ? OR lower(distance_to_metro) LIKE ?", "%#{city.downcase}%", "%#{city.downcase}%")}
  scope :visas, ->(visas){where("lower(visas) LIKE ?", "%#{visas.downcase}%")}
  scope :subspecialty_keywords, ->(keywords){where("lower(subspecialty_keywords) LIKE ?", *keywords.split(" ").map{|keyword| "%#{keyword.downcase}%"})}
  scope :archway, ->{ where.not(aid: nil) }

  def self.search(args)
    jobs = Job.all
    args.each do |k,v|
      jobs = jobs.public_send(k, v) if v.present?
    end
    jobs
  end

  def job_description_markup
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(job_description).html_safe
  end

  def job_description_snippet(length = 150, max_length = 170)
    # In the case of very short descriptions
    length = max_length = job_description.length if job_description.length <= length

    # Finds nearest white-space char to cut off the snippet
    non_snippet = job_description[length...job_description.length]
    first_space_after_cutoff = non_snippet.index(/\s/)

    # Ensures that a junk description without spaces gets cut off eventually
    first_space_after_cutoff ||= max_length - length

    snippet = job_description[0...(length + first_space_after_cutoff)]
    markdown = Redcarpet::Markdown.new(Redcarpet::Render::StripDown)
    markdown.render(snippet + "...")
  end
end
