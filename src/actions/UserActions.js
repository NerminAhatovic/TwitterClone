var alt = require('../alt');
var UserSource = require('../sources/UserSource');
var TweetStore = require('../stores/TweetStore');

class UserActions {
  updateUser(user) {
    this.dispatch(user);
  }

  fetchUser() {
    // we dispatch an event here so we can have "loading" state.
    this.dispatch();

    UserSource.fetchLoggedUser()
      .then((user) => {
        console.log(user);
        // we can access other actions within our action through `this.actions`
        this.actions.updateUser(user);
      })
      .catch((errorMessage) => {
        this.actions.userFailed(errorMessage);
      });
  }

  userFailed(errorMessage) {
    this.dispatch(errorMessage);
  }
}

module.exports = alt.createActions(UserActions);
