$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var index = 0;
  var $button = $('.load');
  var remaining;
  // timestamp variables
  var time = new Date();
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var ampm = function(obj) {
    var h = obj.getHours();
    var mer;
    if(h > 12) {
      h = h - 12;
      mer = " PM"
    } else {
      mer = " AM"
    }

    h = h + ":" + obj.getMinutes() + mer;

    return h;
  }
  
  // init ------------------------------------------------------------------------
  $button.text('Load More Tweets');

  // load initial tweets
  var loadTweets = function(n) {
    while(n > 0){
      var tweet = streams.home[index];
      var created = tweet.created_at;
      var $tweet = $('<div class=".tweet"></div>');
      var $msg = $('<p></p>').text('@' + tweet.user + ': ' + tweet.message);
      var $timestamp = $('<p></p>').text(ampm(created) + " - "+ created.getDay() + " " 
        + month[created.getMonth()] + " " + created.getYear());

      $tweet.append($msg);
      $tweet.append($timestamp);
      $tweet.prependTo($tweets);

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