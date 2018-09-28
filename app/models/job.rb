class Job < ApplicationRecord
  has_many :applications
  has_many :applicants, through: :applications, source: :user
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
end
