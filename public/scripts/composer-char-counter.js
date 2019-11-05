$(document).ready(function() {
  let count = $('.counter').html();
  $('#message').on('keyup', function() {
    let counter = $(this).siblings('.counter')
    counter.html(count - $(this).val().length);
    counter.html() < 0 ? $('.counter').addClass("warning") : $('.counter').removeClass("warning");
  });
});

