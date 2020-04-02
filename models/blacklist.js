var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('./util');

var blackListSchema = new Schema({
    token: {type:String}
});

module.exports = mongoose.model('BlackList', blackListSchema);