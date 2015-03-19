$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var index = 0;
  var $button = $('.load');
  
  
  // init ------------------------------------------------------------------------
  $button.text('Load More Tweets');

  // load initial tweets
  var loadTweets = function(n) {
    while(index < n){
      var tweet = streams.home[index];
      var $tweet = $('<div></div>');
      $tweet.text('@' + tweet.user + ': ' + tweet.message);
      $tweet.prependTo($tweets);
      index ++;
    }
  }
  loadTweets(tweets);

  // body ------------------------------------------------------------------------
  // check for new tweets and 'hold' on to them
  setInterval(function(e){

    var remaining = streams.home.length - index;
    var more = remaining === 0? 'More' : remaining;
    
    // update number on load tweets bar
    $button.text('Load ' + more + ' Tweets');
    
  }, 1000);

  // load new tweets
  $('.load').on('click', function() {
    loadTweets(tweets);
  });

});