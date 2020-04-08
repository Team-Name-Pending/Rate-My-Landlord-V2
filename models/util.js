var mongoose = require('mongoose');
var connection = mongoose.connect(env.process.connection);

exports.connection = connection;