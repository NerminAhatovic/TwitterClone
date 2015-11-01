var React = require('react');
var UserActions = require('../actions/UserActions');

var ProfileBox = React.createClass({
  componentDidMount() {
    UserActions.fetchUser();
  },

  render() {
    return (
      <div className='profile_content'>
        <div className='profile_box'>
          {this.props.user.image
            ? <img className='user_image' src={'images/' + this.props.user.image} />
            : <span className='user_imageholder'></span>
          }
          <span className='user_info'>
            <div>username: @{this.props.user.name}</div>
            <div>Tweets: {this.props.tweetloaded ? this.props.tweetcount :
                <img src='images/ajax-loader.gif' className='small_loader' />}</div>
          </span>
        </div>
      </div>
    );
  }
});

module.exports = ProfileBox;
