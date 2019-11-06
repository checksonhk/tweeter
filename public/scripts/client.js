/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function(str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const convertToDaysAgo = function (date) {
  const daysAgo = Math.floor((Date.now() - date) / (8.64 * (10 ** 7)))
  return (daysAgo) ? daysAgo + " days ago" : "Today";
}; 

const createTweetElement = function(tweet) {
  return $(
    `<article class='tweet'>
      <header>
        <img class='avatar' src="${tweet.user.avatars}">
        <span class='username'>${escape(tweet.user.name)}</span>
        <span class='handle'>${escape(tweet.user.handle)}</span>
      </header>
      <p>${escape(tweet.content.text)}</p>
      <footer>
        <span>${convertToDaysAgo(escape(tweet.created_at))}</span> 
        <ul>
          <li class="fas fa-flag"></li>
          <li class="fas fa-retweet"></li>
          <li class="fas fa-heart"></li>
        </ul>
      </footer>
    </article>`);
};

const hideTweetForm = function() {
  $('.new-tweet').hide();
};


const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

const formValidator = function(tweet) {
  if (tweet.length > 146) {
    throw Error("Tweet Too Long!");
  } else if (tweet.length < 6) {
    throw Error("Tweet cannot be empty!");
  } 
};

const submitTweet = function(input) {
  try {
    formValidator(input);
    return $.ajax({
      url: '/tweets',
      method: 'POST',
      "data": input,
    });
  } catch (error) {
    return Promise.reject(error);
  }
};

const loadTweets = function() {
  return $.ajax({
    url: '/tweets',
    method: 'GET'});
};

const clearTweetForm = (e) => {
  $(e).children('#message').val('');
  $(e).children(".counter").text('140');
};

$(document).on('ready', function() {
  
  hideTweetForm();
  // Load Tweets for the first time
  loadTweets().then(renderTweets);

  // On submit, if successful renders the tweet
  $('form').on('submit', function(e) {
    e.preventDefault();
    
    let data = $(this).serialize();

    submitTweet(data).then((tweet) => {
      renderTweets([tweet]);
    }).catch(function(error) {
      $('.error-message').text(error).hide().slideDown();
    });

    // Clears text form
    clearTweetForm(this);
  });
  
  // Slide down Tweet poster
  $( "button" ).on("click", function() {
    $(".new-tweet").slideToggle(500);
  });
});

