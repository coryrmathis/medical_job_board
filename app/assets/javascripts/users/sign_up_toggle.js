$(document).ready(function(){
  
  var defaultValue = $('.user-type-toggle').find('.active').find('input').val();
  $('#user_account_type').val(defaultValue);

  $(document).on('click', '#applicant', function (){
    $('#user_account_type').val($(this).find('input').val());
  });

  $(document).on('click', '#poster', function (){
    $('#user_account_type').val($(this).find('input').val());
  });
  
});