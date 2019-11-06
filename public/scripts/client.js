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

// TODO: add escape function 
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

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').prepend(createTweetElement(tweet));
  }
};

const formValidator = function(tweet) {
  if (tweet.length > 146) {
    alert("Tweet Too Long!");
  } else if (tweet.length < 6) {
    alert("Tweet cannot be empty!");
  } else {
    return tweet;
  }
};

const submitTweet = function(input) {
  if (formValidator(input)) {
    return $.ajax({
      url: '/tweets',
      method: 'POST',
      "data": input,
    });
  }
};

const loadTweets = function() {
  return $.ajax({
    url: '/tweets',
    method: 'GET'});
};


$(document).on('ready', function() {
  
  // Load Tweets for the first time
  loadTweets().then(renderTweets);

  // On submit, if successful renders the tweet
  $('form').on('submit', function(e) {
    e.preventDefault();
    let data = $(this).serialize();

    submitTweet(data).then((tweet) => {
      renderTweets([tweet]);
    });
  });
  
  // Slide down Tweet poster
  $( "button" ).on("click", function() {
    $( ".new-tweet" ).slideToggle( 400, function() {
      console.log("clicked..");
    });
  });
});

