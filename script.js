$(document).ready(function(){
        var $body = $('.tweets');
        var tweets = streams.home.length;
        var index = 0;
        
        // load initial tweets
        var loadTweets = function() {
          while(index < tweets){
            var tweet = streams.home[index];
            var $tweet = $('<div></div>');
            $tweet.text('@' + tweet.user + ': ' + tweet.message);
            $tweet.prependTo($body);
            index ++;
          }
        }
        loadTweets();

        // check for new tweets
        setInterval(function(e){
          tweets = streams.home.length;
          loadTweets();
        }, 1000);

      });