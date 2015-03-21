$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var tweeted = [];  // array of published tweets
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
      mer = ' PM'
    } else {
      mer = ' AM'
    }

    h = h + ':' + obj.getMinutes() + mer;

    return h;
  }

  // user profile pictures
  var pictures = {
    shawndrost: 'shawndrost.jpg',
    sharksforcheap: 'sharksforcheap.png',
    mracus: 'mracus.jpg',
    douglascalhoun: 'douglascalhoun.jpg',
    user123: 'user123.gif'
  }
  
  // init ------------------------------------------------------------------------
  $button.text('Load More Tweets'); // default button text
  streams.users.user123 = [] // create user array for tweets
  $('.profile').find('.image').find('img').attr('src',
    'icons/owner_empty_avatar.png'
  );  // add user profile picture

  // load initial tweets
  var loadTweets = function(n) {
    while(n > 0){
      var tweet = streams.home[index];
      var created = tweet.created_at;
      var $pic = $('<img>').attr('src', 'images/' + pictures[tweet.user]);
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<a></a>').attr('href', '').addClass('username').text('@' + tweet.user);
      var $msg = $('<p></p>').text(tweet.message);
      var $timestamp = $('<p></p>').text(ampm(created) + " - "+ created.getDay() + " " 
        + month[created.getMonth()] + " " + created.getYear());

      $tweet.append($pic);
      $tweet.append($username);
      $tweet.append($msg);
      $tweet.append($timestamp);
      $tweet.prependTo($tweets);

      index ++;
      n--;
    }
  }

  var updateTime = function(index) {
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

  // compose tweet
  $('.tweet').on('click', function() { 
    
  });

});