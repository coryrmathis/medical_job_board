$(document).ready(function(){
  $("body").on("change", "#job-index-sort-select", function(){
    var selectVal = $(this).val()
    var url = window.location.href + "&sort=" + selectVal
    $.ajax({
      method: "GET",
      url: url
    }).done(function(response){
      window.location.href = url
      $("#job-search-results").replaceWith(response)
    })
  });
});