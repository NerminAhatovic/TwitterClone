var alt = require ('../alt');
var TweetActions = require('../actions/TweetActions');
var UserStore = require('../stores/UserStore');

class TweetStore {
  constructor() {
    this.tweets = [];
    this.errorMessage = null;
    this.loaded = false;

    this.bindListeners({
      handleUpdateTweets: TweetActions.UPDATE_TWEETS,
      handleFetchTweets: TweetActions.FETCH_TWEETS,
      handleTweetsFailed: TweetActions.TWEETS_FAILED,
      submitNewTweet: TweetActions.SUBMIT_NEW_TWEET
    });
  }

  handleUpdateTweets(tweets) {
    this.tweets = tweets;
    if (!this.loaded)
      this.loaded = true;
    this.errorMessage = null;
    console.log('tweets updated');
  }

  handleFetchTweets() {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.tweets = [];
    console.log('fetch tweets');
  }

  handleTweetsFailed(errorMessage) {
    this.errorMessage = errorMessage
  }

  submitNewTweet(tweet) {
    this.tweets.unshift(tweet);
  }

}

module.exports = alt.createStore(TweetStore, 'TweetStore');
