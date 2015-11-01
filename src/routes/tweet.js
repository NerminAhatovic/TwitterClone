'use strict';

var TweetController = {};
var Collections = require('../models/collection.js');

TweetController.getAll = function (req, res) {
	if (!req.session.userid) {
		console.log('storing userid into req.session');
		req.session.userid = 1;
	}
	
	Collections.TweetCollection.forge()
	.query(function (qb) {
		qb.where('user_id', '=', req.session.userid).orderBy('created_at','DESC');
	})
	.fetch({withRelated: ['user']})
	.then(function (result) {
		// console.log(JSON.stringify(result));
		res.status(200).json(result);
	})
	.catch(function (err) {
		console.log(result.err);
		res.status(500).json(err);
	});
};

TweetController.create = function (req, res) {
	Collections.TweetCollection.forge()
	.create({
		user_id: req.session.userid,
		tweet_text: req.body.tweet_text,
		created_at: new Date().toLocaleString()
	})
	.then(function (result) {
		Collections.TweetCollection.forge()
		.query(function (qb) {
			qb.where('id', '=', result.id);
		})
		.fetch({withRelated: ['user']})
		.then(function(tweet) {
			//console.log(JSON.stringify(tweet.first()));
      res.status(200).json(tweet.first());
	  })
	})
	.catch(function (err) {
		console.log(err);
		res.status(500).json(err);
	});
};

module.exports = TweetController;
