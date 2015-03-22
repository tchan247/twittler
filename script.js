$(document).ready(function(){

  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var tweeted = 0;
  var $button = $('.load');
  var remaining;
  var currentUser;
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

  // check timeline
  var checkTimeline = function() {
    var person = $(this).text().substring(1);
    console.log('clicked');
    loadTweets(streams.home);
    $tweets.empty();
    loadTweets(streams.users[person]);
  }

  // load tweets from a list
  var loadTweets = function(arr) {

    for(var i=0, len = arr.length; i<len; i++) {
      var tweet = arr[i];
      var created = tweet.created_at;
      var $pic = $('<img class="user_icon">').attr('src', 'images/users/' + pictures[tweet.user]);
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


      timestamps[timestamps.length] = created;
    }

    // add check timeline function to usernames
    $('.username').on('click', checkTimeline);

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

    tweeted = $('.tweets').children().length;
    remaining = streams.home.length - tweeted;
    var more = remaining === 0? 'More' : remaining;   
    
    // update number on load tweets bar
    $('.load').show(400);
    $button.text('Load ' + more + ' Tweets');

  },  1000);

  // load new tweets
  $('.load').on('click', function() {
    console.log('remaining: ' + remaining +'\nindex: ' + tweeted.length);

    $(this).hide(400);
    $tweets.empty();
    loadTweets(streams.home);
  });

  // compose tweet
  $('.tweet').on('click', function() { 
    
  });

});