$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var index = 0;
  var $button = $('.load');
  var remaining;
  var time = new Date();
  
  // init ------------------------------------------------------------------------
  $button.text('Load More Tweets');

  // load initial tweets
  var loadTweets = function(n) {
    while(n > 0){
      var tweet = streams.home[index];
      var $tweet = $('<div class=".tweet"></div>');
      var $msg = $('<p></p>').text('@' + tweet.user + ': ' + tweet.message);
      var $timestamp = $('<p></p>').text(tweet.created_at.toString());

      $tweet.append($msg);
      $tweet.append($timestamp);
      $tweet.prependTo($tweets);

      // add timestamp
      $('')

      index ++;
      n--;
    }
  }

  var updateTime = function(index) {
    var tweeted = streams.home;
    for(var i=0; i<index; i++) {
      //streams.home[0];
    }
  }


  loadTweets(tweets);

  // body ------------------------------------------------------------------------
  // check for new tweets and 'hold' on to them
  setInterval(function(e){

    remaining = streams.home.length - index;
    var more = remaining === 0? 'More' : remaining;
    
    // update number on load tweets bar
    $button.text('Load ' + more + ' Tweets');

  }, 5000);

  // load new tweets
  $('.load').on('click', function() {
    alert('remaining: ' + remaining +'\nindex: ' + index);
    loadTweets(remaining);
  });

});