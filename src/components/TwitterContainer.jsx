var React = require('react');
var AltContainer = require('alt/AltContainer');
var TweetStore = require('../stores/TweetStore');
var UserStore = require('../stores/UserStore');
var ProfileBox = require('./ProfileBox.jsx');
var TweetInput = require('./TweetInput.jsx');
var TweetList = require('./TweetList.jsx');

var TwitterContainer = React.createClass({

  render() {
    return (
      <div>
        <AltContainer stores={[UserStore, TweetStore]}
          inject={ {
            user: function (props) {
              return UserStore.getState().user
            },
            tweetcount: function (props) {
              return TweetStore.getState().tweets.length
            },
            tweetloaded: function (props) {
              return TweetStore.getState().loaded
            }
          } }>
          <ProfileBox />
        </AltContainer>

        <div className='tweets_content'>
          <AltContainer store={TweetStore}>
            <TweetInput />
          </AltContainer>

          <AltContainer store={TweetStore}>
            <TweetList />
          </AltContainer>
        </div>
      </div>
    );
  }
});

module.exports = TwitterContainer;
