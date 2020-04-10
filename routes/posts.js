var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/users');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var validator = require('validator');
//var fs = require('fs');
require('dotenv').config();
//var multer = require('multer');
//require('./util');

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/addPost', function(req, res, next){
	var test = req.body.comment.replace(/\s+/g, '');//Remove spaces
	var post = new Post();
	const cookie = req.cookies['Authorization'];
	User.findOne({access_token : cookie}, function(err, user){
	if(user){
		post.user_name = user.user_name;
		if(validator.isAlphanumeric(test)){
			post.address = req.body.address;
			post.comment = req.body.comment;
			post.rating = req.body.rating;
			post.image = "nothing";
			post.save(function(err, savedPost){
			if(err)
				res.json({"result" : "something went wrong"});
			else 
				res.json({"response": "Post was saved"});
			});
	
		
		}
		else res.json({"response": "Invalid chars were used"});
		
	}
	else res.json({"response": "User not logged in"});
	});
	
});

//GET all reviews for a certain address or all reviews made by a certain user
router.get('/getPosts', function(req, res, next){
	var mode = req.body.mode;
	if(mode == "user"){
		var house = req.body.house;
		Post.find({address:house}, function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
		});
	}
	else if(mode == "house"){
		var user = req.body.user;
		Post.find({user_name:user}, function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
		});
	}
	else{
		res.json({"response": "Invalid mode "+mode});
	}
});

//Sorts all reviews starting from the newest
router.get('/getRecentPosts', function(req, res, next){
	Post.find({}, function(err, posts){
			if(err){
				res.send(err);
			}
			else res.json(posts);
		}).sort({date_created: -1});
});

router.delete('/deletePost/:id', function(req, res, next){
	var id = req.params.id;
	Post.remove({id:id}, function(err, post){
		if(err)
			res.send(err);
		res.json(post);
	});	
});

//GETs list of all reviewed addresses
router.get('/getHouses', function(req, res, next){
	Post.find().distinct('address', function(err, ids){
		if(err)
			res.send(err);
		else{
			res.send(ids);
		}
		
	});
});

//These were going to be used to store uploaded images of houses, but that feature couldn't be implemented in time
/*app.use(multer({ dest: './public/images',
 rename: function (fieldname, filename) {
   return filename;
 },
}));*/

/*app.post('/api/photo',function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path);
 newItem.img.contentType = 'image/png';
 newItem.save();
});*/

function verifyJwt(jwtString) {
	BlackList.findOne({token:jwtString}, function(err, token){
		if(err)
			throw err;
		if(token)
			return null;
		else{
			var value = jwt.verify(jwtString, process.env.secret);
			return value;
		}
	});
}

module.exports = router;
