$(window).scroll(function() {
  let height = $(window).scrollTop();
  if (height > 300) {
    $('#back2Top').fadeIn();
    $('nav').addClass('nav-color').children('.nav-icons').hide();
  } else {
    $('#back2Top').fadeOut();
    $('nav').removeClass('nav-color').children('.nav-icons').show();
  }
});

$(document).ready(function() {
  const charLimit = 140;
  const $counter = $(".tweet-form-container .counter");

  $('#message').on('input', function() {
    const charsLeft = charLimit - $(this).val().length;
    $counter.text(charsLeft);
    charsLeft < 0 ? $counter.addClass("warning") : $counter.removeClass("warning");
  });

  $("#back2Top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    $(".tweet-form-container").show();
  });
  
});
