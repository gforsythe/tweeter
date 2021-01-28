/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {


const tweetData = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(tweets) {
  // loops through tweets
  for (const tweet of tweets) {
  // calls createTweetElement for each tweet
  const $tweet =  createTweetElement(tweet);
   // takes return value and appends it to the tweets container
  console.log($tweet);
  $('#tweet-container').prepend($tweet);
  }

}



const createTweetElement = function(tweet) {
  const username = tweet.user.name;
  const useravatar = tweet.user.avatars;
  const userhandle = tweet.user.handle;
  const contenttext = tweet.content.text;
  const createdat = tweet.created_at;
  const $tweet = $(`<article class="submitted-tweet">
  <header class="tweet-header">
    <div class="tweet-user-profile">
      <img src="${useravatar}">
      <p class="username">${username}</p>
    </div>
    <span class="user-handle">${userhandle}</span>
  </header>
    <p class="composed-tweet-message">${contenttext}</p>
  <footer class="tweet-footer">
    <p class="date-posted">${createdat}</p>
    <div class="composed-tweeter-icons">
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article>`);
  
  return $tweet;
  
}
//what we see on the page
renderTweets(tweetData);

$('#post-tweet').submit(function (event) {
  const textBody = ($(this).serialize());
  event.preventDefault();
  $.post('/tweets', textBody);
  
})

const loadTweets = function (params) {
  
}


})
