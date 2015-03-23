$(document).ready(function(){

  var login = 'user123';  // current users account
  var profilePic = 'user123.gif';
  var $tweets = $('.tweets');
  var tweets = streams.home.length;
  var tweeted = 0;
  var $button = $('.load');
  var focused = false;
  var remaining;
  var currentUser;
  var myTweets = [];
  // timestamp variables
  var timestamps = [];
  var month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var timeAgo = function(obj) {
    var time = new Date();
    var hours = (time.getHours()-obj.getHours() + 24) % 24;
    var mins = (time.getMinutes()-obj.getMinutes() + 60) % 60;

    if(hours > 0) {
      return hours + ' hour' + (hours>1? 's' : '') + ' ago';
    } else if (mins > 0) {
      return mins + ' minute' + (mins>1? 's' : '') + ' ago';
    }

    return 'Just now';
  };
  var ampm = function(obj) {
    var h = obj.getHours();
    var min = ('0'+obj.getMinutes()).slice(-2);
    var mer;
    if(h > 12) {
      h = h - 12;
      mer = ' PM'
    } else {
      mer = ' AM'
    }

    h = h + ':' + min + mer;

    return h;
  };

  // user profile pictures
  var pictures = {
    shawndrost: 'shawndrost.jpg',
    sharksforcheap: 'sharksforcheap.png',
    mracus: 'mracus.jpg',
    douglascalhoun: 'douglascalhoun.jpg',
    user123: 'user123.gif'
  };
  
  // init ------------------------------------------------------------------------
  $button.text('Load More Tweets'); // default button text
  $('.load').hide();
  $('.username').text(login);
  $('.profile').find('.image').find('img').attr('src',
    'images/users/' + profilePic
  );  // add user profile picture

  // check timeline
  var checkTimeline = function() {
    var person = $(this).closest('.tweet').find('.username').text().substring(1);
    currentUser = person;

    if(person !== login) {
      $('.tweet_input').hide();
    };

    $tweets.empty();
    $('.load').hide();
    loadTweets(person === login? myTweets : streams.users[person]);
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
      var $ago = $('<p class="timestamp"></p>').text(timeAgo(created));
      var date = ampm(created) + ' - ' + created.getDate() + ' ' 
        + month[created.getMonth()] + ' ' + created.getFullYear();

      $tweet.append($pic);
      $tweet.append($username);
      $tweet.append($msg);

      $tweet.append($ago);
      $('.timestamp').attr('title', date);
      // $tweet.append($date);

      $tweet.prependTo($tweets);
    }

    // add check timeline function to usernames
    $('.username, .user_icon').on('click', checkTimeline);

  }

  // get respective array of tweets on currently viewed page
  var getList = function() {

    if(currentUser === undefined) {
      return streams.home
    } else if (currentUser === login){
      return myTweets;
    } else {
      return streams.users[currentUser];
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

    tweeted = $('.tweets').children().length;

    remaining = getList().length - tweeted;
    // var more = remaining === 0? 'More' : remaining;   
    if(remaining > 0) {
      // update number on load tweets bar
      $('.load').show(300);
      $button.text('Load ' + remaining + (remaining === 1? ' Tweet' : ' Tweets'));

      // update document title
      $('title').text('(' + remaining + ') Twittler');
    }
  },  500);

  // load new tweets
  $('.load').on('click', function() {
    // console.log('remaining: ' + remaining +'\nindex: ' + tweeted.length);

    $(this).hide(300);
    $tweets.empty();  //!!! need to refactor

    $('title').text('Twittler');

    loadTweets(getList());
  });

  // compose tweet
  $('.publish_tweet').on('click', function() { 

    var input = $('.tweet_input').find('input');
    var text = input.val();

    if(text.length > 0 && focused) {

      // create tweet object
      var tweet = {
        created_at : new Date(),
        message : text,
        user: login
      };

      myTweets.push(tweet);
      streams.home.push(tweet);

      $('.tweets').empty();
      loadTweets(getList());
    }

    input.val("What's happening?");
    focused = false;
  });

  // input field default value
  // text area focused
  $('.tweet_input').find('input').on('focus', function() {
    if(!focused) {
      $(this).val('');
    }

    focused = true
    $(this).css('color', 'black');
  });

  //text area unfocused
  $('.tweet_input').find('input').on('blur', function() {
    if($(this).val().length === 0) {
      $(this).val("What's happening?").css('color', 'lightblue');
      focused = false;
    }
  })

  //return home
  $('.home').on('click', function() {

    currentUser = undefined;
    $('.tweet_input').show();

    loadTweets(streams.home);
  });

});