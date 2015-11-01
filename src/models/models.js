'use strict';

var moment = require('moment');

var Knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'twitteruser',
		password: 'Password1',
		database: 'twitterclonedb'
	}
});

var Bookshelf = require('bookshelf')(Knex);
Bookshelf.plugin('visibility');

var User = Bookshelf.Model.extend({
	tableName: 'users',
	tweets: function() { return this.hasMany(Tweet) }
});
exports.User = User;

var Tweet = Bookshelf.Model.extend({
	tableName: 'tweets',
  user: function() {
		// Bookshelf assumes that table names are plurals
		// and that the foreignkey is the singular name of the related table fixed with _id
		return this.belongsTo(User); //, 'user_id');
	}
});
exports.Tweet = Tweet;

exports.Bookshelf = Bookshelf;
