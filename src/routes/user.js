var UserController = {};
var Collections = require('../models/collection.js');

UserController.getAll = function (req, res) {
	Collections.UserCollection.forge()
	.fetch()
	.then(function (result) {
		result = result.map(removePasswordFromUserData);
		res.status(200).json(result);
	})
	.catch(function (err) {
		res.status(500).json(err);
	});
};

UserController.getUser = function (req, res) {
	if (!req.session.userid) {
		console.log('storing userid into req.session');
		req.session.userid = 1;
	}

	Collections.UserCollection.forge()
	.query(function (qb) {
		qb.where('id', '=', req.session.userid); //req.params.id);
	})
	.fetchOne()
	.then(function (result) {
		if (!result) {
			res.status(404).json({});
		} else {
			result = removePasswordFromUserData(result);
			res.status(200).json(result)
		}
	})
	.catch(function (err) {
		res.status(500).json(err);
	});
};

var removePasswordFromUserData = function (user) {
	var userObject = user.toJSON();
	if (userObject.hasOwnProperty('password')) {
		delete(userObject.password);
	}
	return userObject;
};

module.exports = UserController;
