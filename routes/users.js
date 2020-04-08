var express = require('express');
var router = express.Router();
var User = require('../models/users');
var BlackList = require('../models/blacklist');
var jwt = require('jsonwebtoken');
require('dotenv').config();
var validator = require('validator');
var bcrypt = require('bcrypt-nodejs');
var cookies = require('cookie-parser');
var c = require('js-cookie');

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
			newUser.salt = bcrypt.genSaltSync(8);
            newUser.password = bcrypt.hashSync(password, newUser.salt);
			newUser.email = email;
            newUser.access_token = createJwt({user_name:username});
            newUser.save(function(err, user) {
                if (err)
                    res.send(err);
				res.cookie('Authorization', user.access_token); 
                res.json({'success' : 'account created'});

            });
        }
    });
});

router.post('/login', function(req, res, next){
	var username = req.body.user_name;
	var password = req.body.password;
	User.findOne({ user_name :  username}, function(err, user){
		if(user){
			password = bcrypt.hashSync(password, user.salt);
			if(password.localeCompare(user.password) == 0){
				BlackList.findOne({ token : user.access_token}, function(err, token){
					if(token){
						BlackList.remove({token : user.access_token}, true, function(err){
							if (err){
								res.send(err);
							}
						});
						//res.send({'result' : 'user was logged in'});
						res.cookie('Authorization', user.access_token);
						return;
					}
					else{
						res.json({"result":"selected user is already signed in"});
						return;
					}
				});
				//res.cookie('Authorization', user.access_token);
			}
			else{
				res.json({"result" : "Incorrect password"});
				return;
			}
		}
		else{
			res.json({"result" : "Account with that username not found!"});
			return;
		}
	});
});

router.post('/logout', function(req, res, next){
	const cookie = req.cookies['Authorization'];
	if(typeof cookie !== 'undefined'){
		BlackList.findOne({token : cookie}, function(err, token){
			if(token){
				res.json({'result' : 'user is already logged out'});
				return;
			}
			else{
				var logged_out = new BlackList();
				logged_out.token = cookie;
				logged_out.save(function(err, tok){
					if (err){
						res.send(err);
						return;
					}
					else{
						//TO DO: Find a way of clearing the cookie from browser
						c.set('Authorization', {expires: Date.now()});
						return;
						//res.json({'result' : 'user logged out'});
					}
				});
			}
		});
	}
	else{
		res.sendStatus(403);
		return;
	}
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
    const header = req.headers['Authorization'];

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
