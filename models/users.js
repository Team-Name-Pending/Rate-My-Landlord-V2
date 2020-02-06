var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
require('./util');

var usersSchema = new Schema({
//	email = {type: String},
	user_name: {type: String},
	password: String,
	access_token: String
});

usersSchema.methods.generateHash = function(password){
	return bcrypt.hashsync(password, bcrypt.genSaltSync(8));
};

usersSchema.methods.generatehash = function(password){
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', usersSchema);
