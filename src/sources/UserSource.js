var UserSource = {
  fetch: function (userid) {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/users/' + userid,
        success: function(data) {
          resolve(data);
        },
        error: function(err) {
          console.log('request failed, error: ' + err);
          reject(err);
        }
      });
    });
  },

  fetchLoggedUser: function () {
    return new Promise(function(resolve, reject) {
      $.ajax({
        type: 'GET',
        contentType: 'application/json',
        url: '/logged_user',
        success: function(data) {
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

module.exports = UserSource;
