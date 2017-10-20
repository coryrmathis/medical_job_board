$(document).ready(function(){
  $("body").on("change", "#state-dropdown", function(){
    $.ajax({
      url: "/cities/" + $(this).val(),
      method: "GET"
    }).done(function(response){
      var citySelect = $("select[name='job[city]']")
      citySelect.empty()
      citySelect.append("<option value=''>City</option>")
      $.each(response, function(i, city){
        citySelect.append("<option value=" + city + ">" + city + "</option>" )
      })
    })
  })
});