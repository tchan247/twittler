$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var index = 0;
  
  // init ------------------------------------------------------------------------
  // load initial tweets
  var loadTweets = function() {
    while(index < tweets){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($tweets);
      index ++;
    }
  }
  loadTweets();

  // body ------------------------------------------------------------------------
  // check for new tweets and hold on to them
  setInterval(function(e){
    var remaining = tweets - index;
    var more = remaining === 0? 'More' : remaining;
    tweets = streams.home.length;
    loadTweets();

    // update number on load tweets bar
    $('.load').text = ('Load ' + more + 'Tweets');
  }, 1000);

  // load tweets
  $('.load');

});