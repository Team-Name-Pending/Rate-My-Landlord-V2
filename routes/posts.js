var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var mongoose = require('mongoose');
var fs = require('fs');
var multer = require('multer');
require('./util');

router.post('/addPost', function(req, res, next){
	var test = req.body.comment.replace(/\s+/g, '');//Remove spaces
	var test2 = req.body.address.replace(/\s+/g, '');
	post = new Post(req.body);
	try{
		var jwtString = req.cookies.Authorization.split(" ");
        var profile = verifyJwt(jwtString[1]);
		if(profile){
			if(validator.isAlphanumeric(test) && validator.isAlphanumeric(test2)){
				post.save(function(err, savedPost){
					if(err)
						throw err;
				});
		
				res.json({"response": "Post was saved"});
			
			}
			res.json({"response": "Invalid chars were used"});
			
			
		}
	}
	catch(err){
		res.send(err);
	}
	
});

router.get('/getPosts', function(req, res, next){
	var mode = req.body.mode;
	if(mode == "house"){
		var house = req.body.house;
		Post.find(house:address, function(err, posts){
			if(err)
				res.send(err);
			res.json(posts);
		});
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

router.get('/getHouses/, fuction(req, res, next){
	Post.find().distinct('address', function(err, ids){
		if(err)
			res.send(err);
		
	});
});

app.use(multer({ dest: './public/images/',
 rename: function (fieldname, filename) {
   return filename;
 },
}));

app.post('/api/photo',function(req,res){
 var newItem = new Item();
 newItem.img.data = fs.readFileSync(req.files.userPhoto.path)
 newItem.img.contentType = 'image/png';
 newItem.save();
});

function verifyJwt(jwtString) {

    var value = jwt.verify(jwtString, process.env.secret);
    return value;
}

