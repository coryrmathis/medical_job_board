$(document).ready(function(){
  if ($('#job_job_description').length > 0) {
    var simplemde = new SimpleMDE({
      element: $("#job_job_description")[0],
    });
  }
});