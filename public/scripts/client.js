/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const convertToDaysAgo = function (date) {
  console.log(new Date(Date.now()));
  console.log(new Date(date));
  return Math.floor((Date.now() - date) / (8.64 * (10**7))) + " days ago";
};

const tweetData = [{
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
    "handle": "@SirIsaac"
  },
  "content": {
    "text": "If I have seen further it is by standing on the shoulders of giants"
  },
  "created_at": 1461116232227
}];

const createTweetElement = function(tweet) {
  const $tweet = $("<article>").addClass('tweet');
  $(`
  <header>
    <img class='avatar' src="${tweet.user.avatars}">
    <span class='username'>${tweet.user.name}</span>
    <span class='handle'>${tweet.user.handle}</span>
  </header>
  <p>${tweet.content.text}</p>
  <footer>
    <span>${convertToDaysAgo(tweet.created_at)}</span> 
    <ul>
      <li class="fas fa-flag"></li>
      <li class="fas fa-retweet"></li>
      <li class="fas fa-heart"></li>
    </ul>
  </footer>`).appendTo($tweet);
  return $tweet;
};

const renderTweets = function(tweets) {
  for (const tweet of tweets) {
    $('#tweets-container').append(createTweetElement(tweet));
  }
};


$(document).on('ready', function() {
  renderTweets(tweetData);
});

