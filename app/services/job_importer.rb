class JobImporter

  def import(position)
    position["aid"] = position.delete("id")
  end

  def find_job
  end
end