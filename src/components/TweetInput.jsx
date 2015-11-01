var React = require('react');
var Formsy = require('formsy-react');
var TweetActions = require('../actions/TweetActions');

var TweetForm = React.createClass({
  submitTweet(e) {
    //e.preventDefault();
    // console.log(this.state.canSubmit);
    // console.log(e.tweet_input);

    if (!this.state.canSubmit)
      return;

    TweetActions.submitNewTweet(e.tweet_input);

    this.state.key = Date.now();
    this.refs.tweet_form.reset();
    return;
  },
  triggerTweetSubmit() {
    //this.refs.tweet_submit.focus();
    this.refs.tweet_submit.click();
  },

  getInitialState() {
    return { canSubmit: true, errorMessage: '', key: Date.now()};
  },
  validForm() {
    //console.log('validForm');
    this.setState({ canSubmit: true, errorMessage: '' });
  },
  invalidForm() {
    //console.log('invalidForm');
    this.setState({ canSubmit: false, errorMessage: 'Please enter tweet.' });
  },

  render() {
    return(
        <Formsy.Form className='tweet_input_form' onInvalid={this.invalidForm}
          onValid={this.validForm} onSubmit={this.submitTweet} ref="tweet_form" >
          <TweetText name='tweet_input' submitTweet={this.submitTweet} tweetSubmit={this.triggerTweetSubmit}
            key={this.state.key} required validationError='Please enter tweet'
            validations={{
              maxLength: 135
            }}
            validationErrors={{
              maxLength: 'You can not type in more than 135 characters.'
            }} />
          <input className='tweet_submit' type='submit' value='Tweet' ref='tweet_submit' />
        </Formsy.Form>
    );
  }
});

var TweetText = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    handleKeyDown(e) {
      var ENTER = 13;
      if( e.keyCode == ENTER ) {
        e.preventDefault();
        this.props.tweetSubmit();
      }
    },
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue: function (event) {
      this.setValue(event.currentTarget.value);
    },

    render: function () {

      // Set a specific className based on the validation
      // state of this component. showRequired() is true
      // when the value is empty and the required prop is
      // passed to the input. showError() is true when the
      // value typed is invalid
      var hasErrorClass = !this.isPristine() && (this.showRequired() || this.showError()) ? ' has_error' : '';

      // An error message is returned ONLY if the component is invalid
      // or the server has returned an error message
      var errorMessage = this.isFormSubmitted() && this.showRequired() ? 'Please enter tweet.' : this.getErrorMessage();

      return (
        <div className={'tweet_input' + hasErrorClass} updateKey={this.props.key}>
          <textarea className='tweet_text' onChange={this.changeValue}
            onKeyDown={this.handleKeyDown} ref='tweet'
            type='text' name='tweet_text' cols="65" rows="3" placeholder="Enter your tweet here" />
          <div className='tweet_error'>{errorMessage}</div>
        </div>
      );
    }
});

module.exports = TweetForm;
