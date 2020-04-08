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
	var test2 = req.body.address.replace(/\s+/g, '');
	var post = new Post();
	const cookie = req.cookies['Authorization'];
	User.findOne({access_token : cookie}, function(err, user){
	if(user){
		post.user_name = user.user_name;
		if(validator.isAlphanumeric(test) && validator.isAlphanumeric(test2)){
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

router.get('/getPosts', function(req, res, next){
	var mode = req.body.mode;
	if(mode == "house"){
		var house = req.body.house;
		Post.find({address:house}, function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
			//res.json({"response" : "House posts were sent!"});
		});
	}
	else if(mode == "user"){
		var user = req.body.user;
		Post.find({user_name:user}, function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
			//res.json({"response": "User posts were sent!"});
		});
	}
	else if(mode == "most recent"){
		Post.find({}, function(err, posts){
			if(err){
				res.send(err);
			}
			else res.json(posts);
		}).sort({date_created: -1});
	}
	else{
		res.json({"response": "Invalid mode"});
	}
});

router.delete('/deletePost/:id', function(req, res, next){
	var id = req.params.id;
	Post.remove({id:id}, function(err, post){
		if(err)
			res.send(err);
		res.json(post);
	});	
});

router.get('/getHouses', function(req, res, next){
	Post.find().distinct('address', function(err, ids){
		if(err)
			res.send(err);
		else{
			res.send(ids);
		}
		
	});
});

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
	res.send("got here");
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