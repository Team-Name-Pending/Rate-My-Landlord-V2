var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var postSchema = new Schema({
    user_name: {type: String},
	img: {data: Buffer, contentType: String},
    comment: {type: String},
    date_created : {type: Date, default: new Date()},
	rating : {type: Number},
	address : {type: String},
    up_votes: {type: Number, default : 0},
    down_votes: {type: Number, default : 0}
});

module.exports = mongoose.model('Post', postSchema);
