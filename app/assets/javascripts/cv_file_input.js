$(document).ready(function(){
  $(".cloud-file-input").each(function(){
    var input = $(this);
    var cleanInput = input.clone(true);
    var label = input.prev("label");
    input.on("change", function(e){
      var fileName = "";
      if(this.files && this.files.length == 1){
        var fileName = this.files[0].name;
        console.log(fileName)
        label.css("color", "#CE5A57")
        label.next("h4").remove()
        label.after("<h4>" + fileName + "</h4>")

      }else{
        label.css("color", "black")
        
      }
    })
  })
});

