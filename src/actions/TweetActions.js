'use strict';

var alt = require('../alt');
var TweetSource = require('../sources/TweetSource');
var UserStore = require('../stores/UserStore');

class TweetActions {
  updateTweets(tweets) {
    this.dispatch(tweets);
  }

  fetchTweets(userid) {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();

    TweetSource.fetch()
      .then((tweets) => {
        // we can access other actions within our action through `this.actions`
        this.actions.updateTweets(tweets);
      })
      .catch((errorMessage) => {
        this.actions.tweetsFailed(errorMessage);
      });
  }

  tweetsFailed(errorMessage) {
    this.dispatch(errorMessage);
  }

  submitNewTweet(tweet_text) {
    TweetSource.insert(tweet_text)
      .then((tweet) => {
        this.dispatch(tweet);
      });
    //use then and add new tweet on Promise
  }
}

module.exports = alt.createActions(TweetActions);
