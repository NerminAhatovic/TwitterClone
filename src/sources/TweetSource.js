var TweetSource = {
  fetch: function () {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/tweets',
        success: function(data) {
          console.log(data);
          resolve(data);
        },
        error: function(err) {
          console.log('request failed, error: ' + err);
          reject(err);
        }
      });
    });
  },
  insert: function (tweet_text) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: '/insert_tweet',
        data: JSON.stringify({tweet_text}),
        success: function(data) {
          console.log(data);
          resolve(data);
        },
        error: function(err) {
          console.log('request failed, error: ' + err);
          reject(err);
        }
      });
    });
  }
};

module.exports = TweetSource;
