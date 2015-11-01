var alt = require ('../alt');
var UserActions = require('../actions/UserActions');

class UserStore {
  constructor() {
    this.user = {};
    this.errorMessage = null;

    this.bindListeners({
      handleUpdateUser: UserActions.UPDATE_USER,
      handleFetchUser: UserActions.FETCH_USER,
      handleUserFailed: UserActions.USER_FAILED
    });
  }

  handleUpdateUser(user) {
    this.user = user;
    this.errorMessage = null;
    console.log('user updated');
  }

  handleFetchUser(user) {
    // reset the array while we're fetching new locations so React can
    // be smart and render a spinner for us since the data is empty.
    this.user = {};
    console.log('fetch user');
  }

  handleUserFailed(errorMessage) {
    this.errorMessage = errorMessage
    console.log(errorMessage);
  }

}

module.exports = alt.createStore(UserStore, 'UserStore');
