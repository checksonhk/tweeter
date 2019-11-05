$(document).ready(function() {
  const charLimit = 140;
  const $counter = $(".new-tweet .counter");

  $('#message').on('keyup', function() {
    const charsLeft = charLimit - $(this).val().length;
    $counter.text(charsLeft);
    charsLeft < 0 ? $counter.addClass("warning") : $counter.removeClass("warning");
  });
});
