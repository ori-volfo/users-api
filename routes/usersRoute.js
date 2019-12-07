const express = require('express');
const router = express.Router();

const User = require('../models/usersModel');

router.route('/')
.get(function(req,resp)
{

    User.find({}, function(err,userObj){
        if(err){
            return resp.send(err);
        }
        return resp.json(userObj);
    })
});


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
            return resp.send('User was added !')
        }
    })
});


module.exports = router;