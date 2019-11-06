$(window).scroll(function() {
  let height = $(window).scrollTop();
  if (height > 200) {
    $('#back2Top').fadeIn();
  } else {
    $('#back2Top').fadeOut();
  }
});

$(document).ready(function() {
  const charLimit = 140;
  const $counter = $(".new-tweet .counter");

  $('#message').on('input', function() {
    const charsLeft = charLimit - $(this).val().length;
    $counter.text(charsLeft);
    charsLeft < 0 ? $counter.addClass("warning") : $counter.removeClass("warning");
  });

  $("#back2Top").click(function(event) {
    event.preventDefault();
    $("html, body").animate({ scrollTop: 0 }, "slow");
    return false;
  });
  
});
