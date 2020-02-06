var express = require('express');
var router = express.Router();
var Post = require('../models/post');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Rate-My-Landlord' });
});

/*GET register page*/
router.get('/register', function(req, res, next) {
    res.render('register');
});

/*GET login page*/
router.get('/login', function(req, res, next) {
    res.render('login');
});


module.exports = router;
