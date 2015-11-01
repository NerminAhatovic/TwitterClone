'use strict';

var Model = require('./models.js');

var Users = Model.Bookshelf.Collection.extend({
	model: Model.User
});
exports.UserCollection = Users;

var Tweets = Model.Bookshelf.Collection.extend({
	model: Model.Tweet
});
exports.TweetCollection = Tweets;
