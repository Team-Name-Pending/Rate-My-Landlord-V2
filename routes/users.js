var express = require('express');
var router = express.Router();
var User = require('../models/users');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', function(req, res, next){
	var username = req.body.user_name;
	var test = req.body.user_name.replace(/\s+/g, '');
    var password = req.body.password;
	var email = req.body.email;
	//if(validator.isAlphanumeric(test) && validator.isEmail(email))
    // Check if account already exists
    User.findOne({ user_name :  username }, function(err, user)
    {
        if (err)
            res.send(err);
        // check to see if theres already a user with that email
        if (user) {
            res.status(401).json({
                "status": "info",
                "body": "Username already taken"
            });
        } else {
            // If there is no user with that username create the user
            var newUser = new User();

            // set the user's local credentials
            newUser.user_name = username;
            newUser.password = newUser.generateHash(password);
			newUser.email = email;
            newUser.access_token = createJwt({user_name:username});
            newUser.save(function(err, user) {
                if (err)
                    throw err;
				res.cookie('Authorization', 'Bearer ' + user.access_token); 
                res.json({'success' : 'account created'});

            });
        }
    });
});

router.post('/login', function(req, res, next){
	var username = req.body.user_name;
	var password = bcrypt.bcrypt.hashSync(body.req.password, bcrypt.genSaltSync(8));
	User.findOne({ 'user_name' :  username, 'password' : password }, function(err, user){
		if(user){
			
		}
	});
});

/*
 Creates a JWT
 */
function createJwt(profile) {
    return jwt.sign(profile, process.env.secret, {
        expiresIn: '10d'
    });
}

//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403);
    }
}

module.exports = router;
