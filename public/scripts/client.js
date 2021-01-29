/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
//document ready shorthand
// import { format, compareAsc } from 'date-fns'



$(() => {
  //render tweets
  const renderTweets = function(tweets) {
    $('#tweet-container').empty();
    for (const tweet of tweets) {
      // calls createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // takes return value and appends it to the tweets container
      $('#tweet-container').prepend($tweet);
    }
  };
  //call dayj to be implmented for timestamp
  dayjs().format();
  dayjs.extend(window.dayjs_plugin_relativeTime);
  //calls escape function
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //creates tweet element
  const createTweetElement = function(tweet) {
    const createdat = tweet.created_at;
    const time = dayjs(createdat).fromNow();
    const username = tweet.user.name;
    const useravatar = tweet.user.avatars;
    const userhandle = tweet.user.handle;
    const contenttext = tweet.content.text;
    const $tweet = $(`<article class="submitted-tweet">
    <header class="tweet-header">
      <div class="tweet-user-profile">
        <img src="${useravatar}">
        <p class="username">${username}</p>
      </div>
      <span class="user-handle">${userhandle}</span>
    </header>
      <p class="composed-tweet-message">${escape(contenttext)}</p>
    <footer class="tweet-footer">
      <p class="date-posted">${time}</p>
      <div class="composed-tweeter-icons">
        <i class="fas fa-flag"></i>
        <i class="fas fa-retweet"></i>
        <i class="fas fa-heart"></i>
      </div>
    </footer>
  </article>`);
    return $tweet;
  };

  //targets the submit button to fireoff whats in the textbox
  $('#post-tweet').submit(function(event) {
    const counter = $('#tweet-text').val();
    const textBody = ($(this).serialize());
    event.preventDefault();
    if (counter.length > 140) {
      $("#too-big-error").slideDown("slow");
      return;
    }
    if (!counter) {
      $("#no-message-error").slideDown("slow");
      return;
    }
    $('.error-message').slideUp();
    $.post('/tweets', textBody)
      .then(loadTweets);
    $('#tweet-text').val('');
  });

  //loads tweets from the database /tweets/
  const loadTweets = function() {
    $.ajax({
      method: 'GET',
      url: '/tweets/',
      dataType: 'json',
      success: function(data) {
        renderTweets(data);
      },
      error: function() {
        alert('error loading tweets');
      }
    });
  };
  loadTweets();
});


