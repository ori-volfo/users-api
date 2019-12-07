const express = require('express');
const router = express.Router();
const axios = require('axios');
const MODEL_PATH = '../models/';
const User = require(MODEL_PATH+'usersModel');

// List all users
router.route('/')
    .get(function(req,resp){

        User.find({}, function(err,userObj){
            if(err){
                return resp.send(err);
            }
            return resp.json(userObj);
        })
    });

// Find user by ID
router.route('/:id')
    .get(function(req,resp){
        User.findById( req.params.id , function(err,per){
            if(err){
                return resp.send(err);
            }
            return resp.json(per);
        })
    });

// Insert new user
router.route('/')
    .post(function(req,resp){
        let newUser = new User({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            address: {
                street: req.body.address.street,
                suite: req.body.address.suite,
                city: req.body.address.city,
                zipcode: req.body.address.zipcode,
                geo: {
                    lat: req.body.address.geo.lat,
                    lng: req.body.address.geo.lng
                }
            },
            phone: req.body.phone,
            website: req.body.website,
            company: {
                name: req.body.company.name,
                catchPhrase: req.body.company.catchPhrase,
                bs: req.body.company.bs
            }
        });

        newUser.save(function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`User ${req.body.username} was added!`);
            }
        })
    });

// Update user by ID
router.route('/:id')
    .put(async function(req,resp){

        const response = await axios.get('http://localhost:8000/api/users/'+req.params.id);
        let updatedUser = response.data;

        for(let key in req.body){
            updatedUser[key] = req.body[key];
        }
        User.findByIdAndUpdate(req.params.id,updatedUser,function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`User ${req.body.username} was updated!`);
            }
        })
    });

// Delete user by ID
router.route('/:id')
    .delete(function(req,resp){

        User.findByIdAndDelete(req.params.id,function(err){
            if(err){
                return resp.send(err);
            }
            else{
                return resp.send(`User ${req.body.username} was deleted!`);
            }
        })
    });

module.exports = router;