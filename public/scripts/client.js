/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//document ready shorthand
$(() => {



  const renderTweets = function (tweets) {
    // loops through tweets
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container').prepend($tweet);
    }

  }



  const createTweetElement = function (tweet) {
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


  //targets the submit button to fireoff whats in the textbox
  $('#post-tweet').submit(function (event) {
    const textBody = ($(this).serialize());
    event.preventDefault();
    $.post('/tweets', textBody);

  })
  //loads tweets from the database /tweets/
  const loadTweets = function () {
    $.ajax({
      method: 'GET',
      url: '/tweets/',
      dataType: 'json',
      success: function (data) {
        renderTweets(data);
      },
      error: function () {
        alert('error loading tweets')
      }
    })
  }

  loadTweets();
})


