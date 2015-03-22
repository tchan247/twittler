$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var tweeted = [];  // array of published tweets
  var $button = $('.load');
  var remaining;
  // timestamp variables
  var timestamps = [];
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
  var loadTweets = function(arr) {

    for(var i=0, len = arr.length; i<len; i++) {
      var tweet = arr[i];
      var created = tweet.created_at;
      var $pic = $('<img>').attr('src', 'images/' + pictures[tweet.user]);
      var $tweet = $('<div class="tweet"></div>');
      var $username = $('<p class="username"></p>').text('@' + tweet.user);
      var $msg = $('<p></p>').text(tweet.message);
      var $timestamp = $('<p></p>').text(ampm(created) + " - "+ created.getDay() + " " 
        + month[created.getMonth()] + " " + created.getYear());

      $tweet.append($pic);
      $tweet.append($username);
      $tweet.append($msg);
      $tweet.append($timestamp);
      $tweet.prependTo($tweets);

      tweeted[tweeted.length] = tweet;  // save tweet in list
      timestamps[timestamps.length] = created;
    }
  }

  // update the date difference
  var updateTime = function(index) {
    for(var i=0; i<index; i++) {
      //streams.home[0];
    }
  }


  loadTweets(streams.home);

  // body ------------------------------------------------------------------------
  // check for new tweets and 'hold' on to them
  setInterval(function(e){

    remaining = streams.home.length - tweeted.length;
    var more = remaining === 0? 'More' : remaining;   
    
    // update number on load tweets bar
    $button.text('Load ' + more + ' Tweets');

  },  1000);

  // load new tweets
  $('.load').on('click', function() {
    alert('remaining: ' + remaining +'\nindex: ' + tweeted.length);
    loadTweets(remaining);
  });

  // click user/ check timeline
  $('.username').on('click', function() {
    var person = $(this).text().substring(1);
    console.log('clicked');
    loadTweets(streams.home);
    $tweets.empty();
    loadTweets(streams.users[person]);
  });

  // compose tweet
  $('.tweet').on('click', function() { 
    
  });

});