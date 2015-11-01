var React = require('react');
var TweetActions = require('../actions/TweetActions');
var Tweet = require('./Tweet.jsx');

var alt = require ('../alt');

var TweetList = React.createClass({
  componentDidMount() {
    TweetActions.fetchTweets();
  },

  render() {

    if (!this.props.loaded) {
      return (
        <div className='loader'>
          <img src="/images/ajax-loader.gif" />
        </div>
      )
    }

    if (!this.props.tweets.length) {
      return (
        <div className='empty_tweets'>
          Your didn't post any tweet yet.
        </div>
      )
    }

    return (
      <ul className='tweets'>
        {this.props.tweets.map((tweet, i) => {
          return (
            <Tweet tweet={tweet} key={tweet.id} />
          )
        })}
      </ul>
    );
  }
});

module.exports = TweetList;
