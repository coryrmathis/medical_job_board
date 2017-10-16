class PlaceholderJob
  attr_reader :specialty, :city, :state

  def initialize(args)
    @specialty = args["specialty"]
    @city = args["city"]
    @state = args["state"]
    @job_description = args["job_description"]
  end

  def job_description
    renderer = Redcarpet::Render::HTML.new(hard_wrap: true)
    markdown = Redcarpet::Markdown.new(renderer)
    markdown.render(@job_description).html_safe
  end
end