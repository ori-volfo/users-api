const express = require('express');
const router = express.Router();
const axios = require('axios');
const MODEL_PATH = '../models/';
const Post = require(MODEL_PATH+'postsModel');

// List all posts
router.route('/')
    .get(function(req,resp){

        Post.find({}, function(err,postObj){
            if(err){
                return resp.send(err);
            }
            return resp.json(postObj);
        })
    });

// Find post by ID
router.route('/:id')
    .get(function(req,resp){
        Post.find( {id:req.params.id} , function(err,per){
            if(err){
                return resp.send(err);
            }
            return resp.json(per);
        })
    });

// Insert new post
router.route('/')
    .post(function(req,resp){
        let newPost = new Post({
            id : req.body.id,
            userId : req.body.userId,
            body : req.body.body,
            title : req.body.title
        });

        newPost.save(function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`Post ${req.body.title} was added!`);
            }
        })
    });

// Update post by ID
router.route('/:id')
    .put(async function(req,resp){

        const response = await axios.get('http://localhost:8000/api/posts/'+req.params.id);
        let updatedPost = response.data;

        for(let key in req.body){
            updatedPost[key] = req.body[key];
        }
        Post.updateOne({id:req.params.id},updatedPost,function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`Post ${req.params.id} was updated!`);
            }
        })
    });

// Delete post by ID
router.route('/:id')
    .delete(function(req,resp){

        Post.findOneAndDelete({id:req.params.id},function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`Post ${req.params.id} was deleted!`);
            }
        })
    });

module.exports = router;