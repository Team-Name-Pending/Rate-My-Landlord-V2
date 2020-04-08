var mongoose = require('mongoose');
var connection = mongoose.connect(process.env.connection);

exports.connection = connection;
