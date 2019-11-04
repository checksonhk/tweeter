$(document).ready(function() {
  console.log('working...');
  let count = $('.counter').html();
  $('#message').on('keyup', function() {
    $('.counter').html(count - $('#message').val().length);
    if ($('.counter').html() < 0) {
      $('.counter').css('color','red');
    } else if ($('.counter').html() > 0) {
      $('.counter').css('color','black');
    })
  });
});

