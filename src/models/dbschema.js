'use strict';

var Schema = {
	users: {
		id: {type: 'increments', nullable: false, primary: true},
		email: {type: 'string', maxlength: 254, nullable: false, unique: true},
		name: {type: 'string', maxlength: 150, nullable: false},
    image: {type: 'string', maxlength: 254, nullable: false},
		password: {type: 'string', nullable: false}
	},

	tweets: {
		id: {type: 'increments', nullable: false, primary: true},
		user_id: {type: 'integer', nullable: false, unsigned: true},
		//title: {type: 'string', maxlength: 150, nullable: false},
		tweet_text: {type: 'string', maxlength: 150, nullable: false},
		created_at: {type: 'dateTime', nullable: false}
	}
};

module.exports = Schema;
