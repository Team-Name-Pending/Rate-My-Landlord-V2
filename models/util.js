var mongoose = require('mongoose');
var connection = mongoose.connect('mongodb://mongodb2140be:as1sos@danu7.it.nuigalway.ie:8717/mongodb2140');

exports.connection = connection;