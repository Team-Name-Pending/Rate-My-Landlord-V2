var express = require('express');
var router = express.Router();
var Post = require('../models/post');


router.post('/addPost', function(req, res, next){
	var test = req.body.comment.replace(/\s+/g, '');//Remove spaces
	var test2 = req.body.address.replace(/\s+/g, '');
	post = new Post(req.body);
	if(validator.isAlphanumeric(test) && validator.isAlphanumeric(test2)){
		post.save(function(err, savedPost){
			if(err)
				throw err;
		});
		
		res.json({"response": "Post was saved"});
			
	}
	res.json({"response": "Invalid chars were used"});
});

router.get('/getPosts', function(req, res, next){
	
});

router.delete('/deletePost/:id', function(req, res, next){
	var id = req.params.id;
	Post.remove({id:id}, function(err, post){
		if(err)
			res.send(err);
		res.json(post);
	});	
});